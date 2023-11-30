import UserRepo from '../../../repository/userRepo';
import VerificationRepo from '../../../repository/verificationRepo';
import Token from '../../../utils/jwt/userToken';
import HelperFunctions from '../../../utils/helperFunctions';
import keys from '../../../config/keys';
import jwt from 'jsonwebtoken';
import { sendNotification } from '../../../providers/notifications';
import {
  NOTIFICATION_TYPES,
  NOTIFICATION_CHANNELS,
  ALIAS,
  USER_TYPE,
  VERIFICATION_TYPE,
} from '../../../utils/constant/options';

/**
 * @description Auth Service class
 */
export default class UserAuthService {
  /**
   * @description function to signup user
   * @param {object} data - The user data
   * @returns {object} - Returns an object
   */
  static async createUserAuthService(data) {
    const { firstName, lastName, email, phone, password } = data;

    const userExist = await UserRepo.findUserByEmailOrPhone(email, phone);

    if (userExist)
      return {
        statusCode: 409,
        message: 'User already registered',
      };

    const hashedPassword = HelperFunctions.hashPassword(password);

    const newUser = {
      email: email.toLowerCase(),
      firstName: HelperFunctions.capitalize(firstName),
      lastName: HelperFunctions.capitalize(lastName),
      phone: phone,
      password: hashedPassword,
    };

    const createNewUser = await UserRepo.createUser(newUser);

    const token = await HelperFunctions.generateUniqueToken(createNewUser);

    const verification = await VerificationRepo.createVerification({
      userId: createNewUser._id,
      onModel: USER_TYPE.USER,
      notificationType: NOTIFICATION_CHANNELS.EMAIL,
      verificationType: NOTIFICATION_TYPES.EMAIL_VERIFICATION,
      token: token.data.uniqueTokenHash,
    });

    if (verification)
      sendNotification(
        NOTIFICATION_CHANNELS.EMAIL,
        {
          type: NOTIFICATION_TYPES.PUSH,
          label: NOTIFICATION_TYPES.SIGNUP_MAIL,
          vars: { token: token.data.token },
          firstName: createNewUser.firstName,
          alias: ALIAS.ALIAS_WELCOME,
        },
        createNewUser
      );

    const accessToken = Token.userGenerateToken(createNewUser);

    createNewUser.password = undefined;

    logger.info(
      `createUserService -> info: User created with email: ${JSON.stringify(
        createNewUser
      )}`
    );

    return {
      statusCode: 201,
      message: 'User created successfully',
      data: {
        user: createNewUser,
        accessToken,
      },
    };
  }

  /**
   * @description - This method is used to login a user
   * @param {object} data - The user data
   * @returns {object} - Returns an object
   */
  static async loginUserAuthService(data) {
    let user;
    const { email, password, phone } = data;

    user = await UserRepo.findUserByEmailOrPhone(email, phone);

    if (!user)
      return {
        statusCode: 409,
        message: 'Invalid Credentials',
      };

    const isPasswordValid = await HelperFunctions.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid)
      return {
        statusCode: 409,
        message: 'Invalid Credentials',
      };

    user = await UserRepo.findUserById(user._id, false, ['image']);

    const accessToken = Token.userGenerateToken(user);
    logger.info(
      `loginUserService -> info: User logged in with email:  ${JSON.stringify(
        user.email
      )}`
    );
    user.password = undefined;
    return {
      statusCode: 200,
      message: 'User logged in successfully',
      data: {
        user,
        accessToken,
      },
    };
  }

  /**
   * @description - This method is used to change a user's password
   * @param {object} user - The user data
   * @param {object} data - The user data
   * @returns {object} - Returns an object
   */
  static async changePasswordService(user, data) {
    const { oldPassword, newPassword, confirmNewPassword } = data;

    const isPasswordValid = await HelperFunctions.comparePassword(
      oldPassword,
      user.password
    );

    if (!isPasswordValid)
      return {
        statusCode: 401,
        message: 'Invalid Password',
      };

    if (newPassword !== confirmNewPassword)
      return {
        statusCode: 401,
        message: 'Passwords do not match',
      };

    const isSamePassword = await HelperFunctions.comparePassword(
      newPassword,
      user.password
    );

    if (isSamePassword)
      return {
        statusCode: 401,
        message: 'New password cannot be the same as old password',
      };

    const hashedPassword = HelperFunctions.hashPassword(newPassword);

    await UserRepo.updateUser(user._id, { password: hashedPassword });
    logger.info(
      `changePasswordService -> info: User changed password with email: ${JSON.stringify(
        user.email
      )}`
    );

    return {
      statusCode: 200,
      message: 'Password changed successfully',
    };
  }

  /**
   * @description - This method is used to handle a user's forgotten password by sending an OTP for mobile or a link for email.
   * @param {object} data - The user data
   * @param {string} type - The type of forgot password action (e.g., 'Mobile Forgot Password')
   * @returns {object} - Returns an object with the status code and message
   */
  static async forgotPasswordService(data) {
    const { email, mobile } = data;

    const user = await UserRepo.findUserByEmail(email);

    if (!user) {
      return {
        statusCode: 404,
        message:
          'If this email exists, instructions to reset your password will be sent.',
      };
    }

    if (mobile) {
      const tokenData = await HelperFunctions.generateUniqueToken(user);

      await VerificationRepo.deleteVerificationsByUserIdAndVerificationType(
        user._id,
        NOTIFICATION_TYPES.MOBILE_FORGOT_PASSWORD
      );

      await VerificationRepo.createVerification({
        userId: user._id,
        onModel: USER_TYPE.USER,
        notificationType: NOTIFICATION_CHANNELS.EMAIL,
        verificationType: NOTIFICATION_TYPES.MOBILE_FORGOT_PASSWORD,
        token: tokenData.data.uniqueTokenHash,
      });

      await sendNotification(
        NOTIFICATION_CHANNELS.SMS,
        {
          type: NOTIFICATION_TYPES.PUSH,
          label: NOTIFICATION_TYPES.MOBILE_FORGOT_PASSWORD,
          vars: { token: tokenData.data.token },
          firstName: user.firstName,
          alias: ALIAS.ALIAS_FORGOT_PASSWORD,
        },
        user
      );
    } else {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        keys.JWT.SECRET,
        { expiresIn: 900 }
      );
      const link = `${keys.CLIENT_URL}?token=${token}`;

      await sendNotification(
        NOTIFICATION_CHANNELS.EMAIL,
        {
          type: NOTIFICATION_TYPES.PUSH,
          label: NOTIFICATION_TYPES.FORGOT_PASSWORD,
          vars: { link },
          firstName: user.firstName,
        },
        user
      );
    }

    logger.info(
      `forgotPasswordService -> info: User requested password reset with email: ${JSON.stringify(
        user.email
      )}`
    );

    return {
      statusCode: 200,
      message:
        'If this email exists, instructions to reset your password will be sent.',
    };
  }

  /**
   * @description - This method is used to reset a user's password
   * @param {object} data - The user data
   * @returns {string} token - The user token
   * @param {object} user - The user data
   */
  static async resetPasswordService(data, token) {
    try {
      let user;
      const { mobile } = data;

      const { newPassword, confirmPassword } = data;

      if (newPassword !== confirmPassword) {
        return {
          statusCode: 401,
          message: 'Passwords do not match',
        };
      }

      if (!mobile) {
        let verifiedToken;
        try {
          verifiedToken = jwt.verify(token, keys.JWT.SECRET);
        } catch (error) {
          return {
            statusCode: 401,
            message:
              'Token link has expired or is invalid, please request a new one',
          };
        }

        const { email } = verifiedToken;

        user = await UserRepo.findUserByEmail(email);

        if (!user)
          return {
            statusCode: 404,
            message: 'User does not exist',
          };
      } else {
        user = await UserRepo.findUserByEmail(data.email.toLowerCase());

        const verifyToken = await HelperFunctions.verifyUserToken(
          user._id.toString(),
          token,
          NOTIFICATION_TYPES.MOBILE_FORGOT_PASSWORD
        );

        if (verifyToken.statusCode !== 200) return verifyToken;
      }

      const hashedPassword = await HelperFunctions.hashPassword(newPassword);

      await UserRepo.updateUser(user._id, { password: hashedPassword });

      logger.info(
        `resetPasswordService -> info: User reset password with email:  ${JSON.stringify(
          user.email
        )}`
      );
      return {
        statusCode: 200,
        message: 'Password reset successfully',
      };
    } catch (error) {
      logger.error(`resetPasswordService -> error: ${error.message}`);
      return {
        statusCode: 500,
        message: 'Oops! Something went wrong',
      };
    }
  }
}
