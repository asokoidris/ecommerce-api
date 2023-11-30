import UserRepo from '../../../repository/userRepo';
/**
 * @description User Service class
 */

export default class UserService {
  /**
   * @description function to get a user profile
   * @param user
   * @param user
   */
  static async getUserProfileService(user) {
    const { id } = user;

    const getProfile = await UserRepo.findUserById(id, false, ['image']);

    if (!getProfile) {
      return {
        statusCode: 404,
        message: 'User profile not found',
      };
    }

    logger.info(
      `getUserProfileService -> info: User profile fetched successfully ${JSON.stringify(
        getProfile
      )}`
    );

    getProfile.password = undefined;

    return {
      statusCode: 200,
      message: 'User profile fetched successfully',
      data: getProfile,
    };
  }

  /**
   * @description function to update a user profile
   * @param {object} data - The user data
   * @returns {object} - Returns an object
   */
  static async updateUserProfile(user, data) {
    const { id } = user;
    const existingUser = await UserRepo.findUserById(id, false, []);

    if (!existingUser)
      return {
        statusCode: 404,
        message: 'User profile not found',
      };

    const emailExist = await UserRepo.findUserByEmail(data.email);

    if (emailExist && emailExist._id.toString() !== id.toString())
      return {
        statusCode: 409,
        message: 'Email already exist',
      };

    const phoneExist = await UserRepo.findUserByPhone(data.phone);

    if (phoneExist && phoneExist._id.toString() !== id.toString())
      return {
        statusCode: 409,
        message: 'Phone number already exist',
      };

    if (data.email && data.email !== existingUser.email)
      data.emailVerified = false;

    if (data.phone && data.phone !== existingUser.phone)
      data.phoneVerified = false;

    const updatedUser = await UserRepo.updateUser(id, data);
    if (!updatedUser) {
      return {
        statusCode: 404,
        message: 'User profile not found',
      };
    }

    updatedUser.password = undefined;

    return {
      statusCode: 200,
      message: 'User profile updated successfully',
      data: updatedUser,
    };
  }
}
