import UserService from '../service/userService';
import { errorResponseMessage } from '../../../utils/constant/options';
import { successResponse, errorResponse } from '../../../utils/response';

/**
 * @description User Controller
 */

class UserController {
  /**
   * @description controller to update user profile
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async updateUserController(req, res) {
    try {
      const { user, body } = req;
      const result = await UserService.updateUserProfile(user, body);
      if (result.statusCode !== 200)
        return errorResponse(res, result.statusCode, result.message);
      logger.info(
        `Profile updated Successfully  ${JSON.stringify(user.email)}`
      );
      return successResponse(res, 200, result.message, result.data);
    } catch (error) {
      logger.error(
        `Error in updating profile: ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description controller to get a user profile
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getUserProfileController(req, res) {
    try {
      const { user } = req;
      const result = await UserService.getUserProfileService(user);
      if (result.statusCode !== 200)
        return errorResponse(res, result.statusCode, result.message);
      return successResponse(res, 200, result.message, result.data);
    } catch (error) {
      logger.error(`Error in fetching user: ${JSON.stringify(error.message)}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description controller to get a user profile
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async inviteBusinessController(req, res) {
    try {
      const { user, body } = req;
      const result = await UserService.inviteBusinessService(user, body);

      if (result.statusCode !== 200)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(res, 200, result.message, result.data);
    } catch (error) {
      logger.error(`Error in fetching user: ${JSON.stringify(error.message)}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
}
export default UserController;
