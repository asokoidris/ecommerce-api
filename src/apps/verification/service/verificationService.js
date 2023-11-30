import VerificationRepo from '../../../repository/verificationRepo';
import UserRepo from '../../../repository/userRepo';
import HelperFunctions from '../../../utils/helperFunctions';
import {
  NOTIFICATION_TYPES,
  NOTIFICATION_CHANNELS,
  USER_TYPE,
  ALIAS,
} from '../../../utils/constant/options';
import keys from '../../../config/keys';
import { sendNotification } from '../../../providers/notifications/index';

/**
 * @description Verification Controller class
 */
export default class VerificationService {
  /**
   * @description function to initiate verification for Authenticated user
   * @param {object} user - The user data
   * @param {object} data - The query data
   * @returns {object} - Returns an object
   */
  static async authInitiateVerificationService(user, data) {
    let validationResponse;

    const { notificationType, verificationType } = data;
    const userInfo =
      user.userType === USER_TYPE.USER
        ? await UserRepo.findUserById(user._id)
        : await BusinessRepo.findBusinessById(user._id);

    // For SMS notification type
    if (notificationType === NOTIFICATION_CHANNELS.SMS) {
      const phone =
        user.userType === USER_TYPE.USER
          ? userInfo.phone
          : userInfo.businessPhoneNumber;
      validationResponse = HelperFunctions.validatePhone(phone, user.userType);
      if (!validationResponse.valid)
        return { statusCode: 400, message: validationResponse.message };
    }

    // For Email notification type
    if (notificationType === NOTIFICATION_CHANNELS.EMAIL) {
      const email =
        user.userType === USER_TYPE.USER
          ? userInfo.email
          : userInfo.businessEmail;

      validationResponse = HelperFunctions.validateEmail(email, user.userType);

      if (!validationResponse.valid)
        return { statusCode: 400, message: validationResponse.message };
    }

    // For verification status
    const emailVerified =
      user.userType === USER_TYPE.USER
        ? userInfo.emailVerified
        : userInfo.businessEmailVerified;
    const phoneVerified =
      user.userType === USER_TYPE.USER
        ? userInfo.phoneVerified
        : userInfo.businessPhoneNumberVerified;

    validationResponse = HelperFunctions.validateVerificationStatus(
      emailVerified,
      phoneVerified,
      user.userType,
      user.userType === USER_TYPE.USER
        ? verificationType
        : `${USER_TYPE.BUSINESS.toUpperCase()}_${verificationType}`
    );

    if (!validationResponse.valid)
      return { statusCode: 409, message: validationResponse.message };

    const token = await HelperFunctions.generateUniqueToken(userInfo);

    logger.info(
      `authInitiateVerificationService -> info: Verification initiated with email: ${JSON.stringify(
        token
      )}`
    );

    if (token.statusCode === 500)
      return {
        statusCode: 500,
        message: 'Error generating token',
      };

    await VerificationRepo.deleteVerificationsByUserIdAndVerificationType(
      userInfo._id || userInfo.id,
      user.userType === USER_TYPE.USER
        ? verificationType
        : `${USER_TYPE.BUSINESS.toUpperCase()}_${verificationType}`
    );

    const verification = await VerificationRepo.createVerification({
      userId: userInfo._id || userInfo.id,
      onModel: user.userType,
      notificationType,
      verificationType:
        user.userType === USER_TYPE.USER
          ? verificationType
          : `${USER_TYPE.BUSINESS.toUpperCase()}_${verificationType}`,
      token: token.data.uniqueTokenHash,
    });

    logger.info(
      `authInitiateVerificationService -> info: Verification initiated with email: ${JSON.stringify(
        verification
      )}`
    );

    await sendNotification(
      notificationType,
      {
        type: NOTIFICATION_TYPES.PUSH,
        label:
          user.userType === USER_TYPE.USER
            ? verificationType
            : `${USER_TYPE.BUSINESS.toUpperCase()}_${verificationType}`,
        vars: {
          token: token.data.token,
        },
        alias: ALIAS.ALIAS_HELLO,
      },
      userInfo,
      user.userType
    );

    return {
      statusCode: 201,
      message: `Verification initiated successfully via ${notificationType}`,
    };
  }

  /**
   * @description function to verify a user depending on the token and verification type
   * @param {object} user - The user data
   * @param {object} data - The body
   * @returns {object} - Returns an object with status and message
   */
  static async authVerifyCodeService(user, data) {
    const userInfo =
      user.userType === USER_TYPE.USER
        ? await UserRepo.findUserById(user._id)
        : await BusinessRepo.findBusinessById(user._id);

    const userId = userInfo._id.toString();
    const { token, verificationType } = data;
    const maxTrials = parseInt(keys.VERIFICATION.MAX_TRAILS, 10);
    const expiryMinutes = parseInt(keys.VERIFICATION.EXPIRY_TIME, 10);

    try {
      const uniqueTokenHashToHash = `${userId}${token}`;
      const hashToken = HelperFunctions.deterministicHash(
        userId,
        uniqueTokenHashToHash
      );

      const verificationTypePrefix =
        user.userType === USER_TYPE.USER
          ? verificationType
          : `${USER_TYPE.BUSINESS.toUpperCase()}_${verificationType}`;

      const verification =
        await VerificationRepo.findVerificationByUserIdAndVerificationType(
          userInfo._id,
          verificationTypePrefix
        );
      if (!verification)
        return { statusCode: 404, message: 'Please request a new otp.' };

      const expiryDate = new Date(verification.expiryTime);
      expiryDate.setMinutes(expiryDate.getMinutes() + expiryMinutes);

      if (new Date() > expiryDate) {
        return {
          statusCode: 410,
          message: 'The provided otp has expired, please request a new one.',
        };
      }

      if (verification.token !== hashToken) {
        verification.trials += 1;
        await verification.save();
        return verification.trials > maxTrials
          ? { statusCode: 429, message: 'Maximum trial attempts exceeded.' }
          : { statusCode: 400, message: 'The provided token is incorrect.' };
      }

      const isTwoFactor =
        verificationType === NOTIFICATION_TYPES.TWO_FACTOR_AUTHENTICATION;

      const isUserEmailVerification =
        verificationTypePrefix === NOTIFICATION_TYPES.EMAIL_VERIFICATION;
      const isUserPhoneVerification =
        verificationTypePrefix === NOTIFICATION_TYPES.PHONE_VERIFICATION;
      const isBusinessEmailVerification =
        verificationTypePrefix ===
        NOTIFICATION_TYPES.BUSINESS_EMAIL_VERIFICATION;
      const isBusinessPhoneVerification =
        verificationTypePrefix ===
        NOTIFICATION_TYPES.BUSINESS_PHONE_VERIFICATION;
      const isMobileForgetPassword =
        verificationTypePrefix === NOTIFICATION_TYPES.MOBILE_FORGOT_PASSWORD;

      let responseMessage = '';
      let updateData = {};

      if (!isTwoFactor && !isMobileForgetPassword) {
        if (user.userType === USER_TYPE.USER) {
          updateData = {
            ...(isUserEmailVerification && { emailVerified: true }),
            ...(isUserPhoneVerification && { phoneVerified: true }),
          };

          responseMessage = isUserEmailVerification
            ? 'Email verification successful.'
            : 'Phone verification successful.';
          await UserRepo.updateUser(userInfo._id, updateData);
        } else if (user.userType === USER_TYPE.BUSINESS) {
          updateData = {
            ...(isBusinessEmailVerification && { businessEmailVerified: true }),
            ...(isBusinessPhoneVerification && {
              businessPhoneNumberVerified: true,
            }),
          };

          responseMessage = isBusinessEmailVerification
            ? 'Business email verification successful.'
            : 'Business phone verification successful.';
          await BusinessRepo.updateBusiness(userInfo._id, updateData);
        }
      }

      await VerificationRepo.deleteVerificationsByUserIdAndVerificationType(
        userInfo._id,
        verificationTypePrefix
      );

      if (isTwoFactor) {
        return {
          statusCode: 200,
          message: 'Two-factor authentication successful.',
        };
      }

      if (isMobileForgetPassword) {
        return {
          statusCode: 200,
          message: 'Mobile verification successful.',
        };
      }

      return { statusCode: 200, message: responseMessage };
    } catch (error) {
      logger.error(`authVerifyCodeService -> error: ${error.message}`);
      throw new Error(error);
    }
  }
}
