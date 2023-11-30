import VerificationService from '../service/verificationService';
import { successResponse, errorResponse } from '../../../utils/response';
import { errorResponseMessage } from '../../../utils/constant/options';

/**
 * @description Verification Controller
 */
export default class VerificationController {
  /**
   * @description generate a verification code for a user depending on the user type and notification type
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async authInitiateVerificationController(req, res) {
    try {
      const { user, query } = req;

      const result = await VerificationService.authInitiateVerificationService(
        user,
        query
      );
      if (result.statusCode !== 201)
        return errorResponse(res, result.statusCode, result.message);

      logger.info(
        `authInitiateVerificationController -> info: Verification initiated with email: ${JSON.stringify(
          result
        )}`
      );
      return successResponse(res, 200, result.message, result.data);
    } catch (err) {
      logger.error(
        `authInitiateVerificationController -> error: ${err.message}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description verify a user depending on the user type and notification type
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async authVerifyCodeController(req, res) {
    try {
      const { user, body } = req;

      const result = await VerificationService.authVerifyCodeService(
        user,
        body
      );

      if (result.statusCode !== 200)
        return errorResponse(res, result.statusCode, result.message);

      logger.info(
        `authVerifyCodeController -> info: Verification initiated with email: ${JSON.stringify(
          result
        )}`
      );
      return successResponse(res, 200, result.message, result.data);
    } catch (err) {
      logger.error(`authVerifyCodeController -> error: ${err.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
}
