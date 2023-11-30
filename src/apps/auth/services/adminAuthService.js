import AdminModel from '../../../models/admin';
import Token from '../../../utils/jwt/adminToken';
import HelperFunctions from '../../../utils/helperFunctions';
import AdminRepo from '../../../repository/adminRepo';

/**
 * @description Admin Auth Service class
 */

export default class AdminAuthervice {
  /**
   *  @description function to sign-up or register admin
   * @param {object} data - req body object from the adminController
   * @return {object} Returned object
   */
  static async loginAdminService(data) {
    const { email, password } = data;

    const isSuperAdmin = HelperFunctions.isSuperAdmin(data);

    if (isSuperAdmin) {
      const token = await Token.generateAdminAccessSecretKey(isSuperAdmin);

      logger.info(
        `loginAdminService -> Super Admin Login Token created successfully: ${token}`
      );

      return {
        statusCode: 200,
        message: 'Super Admin Successfully Logged In',
        data: {
          ...isSuperAdmin,
          token,
        },
      };
    }

    const isAdmin = await AdminRepo.findAdminUserByEmail(email);

    if (!isSuperAdmin && !isAdmin)
      return {
        statusCode: 409,
        message: 'Invalid Credentials',
      };

    const isPasswordValid = await HelperFunctions.comparePassword(
      password,
      isAdmin.password
    );

    if (!isPasswordValid)
      return {
        statusCode: 409,
        message: 'Invalid Credentials',
      };

    const token = await Token.generateAdminAccessSecretKey(isAdmin);

    logger.info(
      `adminLoginService -> Admin Login Token created successfully: ${token}`
    );

    isAdmin.password = undefined;

    return {
      statusCode: 200,
      message: 'Admin Successfully Logged In',
      data: {
        isAdmin,
        token,
      },
    };
  }

  /**
   * @description function to onboard a new admin by a super admin
   * @param {Object} data - req body object from the AdminController
   * @return {Object} Returned object
   */
  static async onboardAdminService(data) {
    const { firstName, lastName, email, phone, role, password } = data;

    const admin = await AdminRepo.findAdminByEmailOrPhone(email, phone);

    if (admin)
      return {
        statusCode: 409,
        message: 'Admin already exists with this email',
      };

    const roles = typeof role === 'string' ? [role] : role;

    const newAdmin = {
      firstName: HelperFunctions.capitalize(firstName),
      lastName: HelperFunctions.capitalize(lastName),
      email: email.toLowerCase(),
      phone,
      password: await HelperFunctions.hashPassword(password),
      createdBySuperAdmin: true,
      role: roles,
    };

    const createNewAdmin = await AdminRepo.createAdminUser(newAdmin);

    if (!createNewAdmin)
      return {
        statusCode: 500,
        message: 'Something went wrong, please try again',
      };

    logger.info(
      `onboardAdminService -> Admin created successfully: ${JSON.stringify(
        createNewAdmin
      )}`
    );

    createNewAdmin.password = undefined;

    return {
      statusCode: 201,
      message: 'Admin created successfully',
      data: createNewAdmin,
    };
  }
}
