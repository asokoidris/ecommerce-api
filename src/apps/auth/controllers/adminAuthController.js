import AdminService from '../services/adminAuthService';
import { errorResponse, successResponse } from '../../../utils/response';
import { errorResponseMessage } from '../../../utils/constant/options';

/**
 * @description Authentication Controller
 */

export default class AdminController {
  /**
   * @description register aAdmin controller
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async adminLoginController(req, res) {
    try {
      const result = await AdminService.loginAdminService(req.body);
      logger.info(`adminLoginController -> result: ${JSON.stringify(result)}`);
      if (result.statusCode !== 200)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(
        `adminLoginController -> error: ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description register a user controller
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */

  static async onboardAdminController(req, res) {
    try {
      const result = await AdminService.onboardAdminService(req.body);
      logger.info(
        `onboardAdminController -> result: ${JSON.stringify(result)}`
      );
      if (result.statusCode === 409 || result.statusCode === 500) {
        return errorResponse(res, result.statusCode, result.message);
      }

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      logger.error(`onboardAdminController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
}
