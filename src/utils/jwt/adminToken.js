import jwt from 'jsonwebtoken';
import keys from '../../config/keys';
import HelperFunctions from '../helperFunctions';
import AdminModel from '../../models/admin';

export default class AdminToken {
  /**
   * @description function to generate a admin access token
   * @param {Object} admin - req body object from admin service
   * @returns {Object} - Returned objects
   **/
  static async generateAdminAccessSecretKey(admin) {
    const payload = {
      id: admin._id || admin.id,
      email: admin.email,
    };
    const options = {
      expiresIn: keys.JWT.EXPIRES,
    };
    try {
      const token = await jwt.sign(payload, keys.JWT.SECRET, options);
      logger.info(`generateAdminAccessSecretKey -> token: ${token}`);
      return token;
    } catch (err) {
      logger.error(`generateAdminAccessSecretKey -> error: ${err.message}`);
      throw new Error(err.message);
    }
  }

  /**
   * @description function to verify an admin access token
   * @param {string} adminAccessSecretToken - admin access token from request header
   * @returns {Object} - Returned objects
   */
  static async verifyAdminAccessSecretKey(adminAccessSecretToken) {
    try {
      const verifyToken = await jwt.verify(
        adminAccessSecretToken,
        keys.JWT.SECRET
      );
      const isSuperAdmin = HelperFunctions.isSuperAdmin(verifyToken);

      if (isSuperAdmin) {
        logger.info(
          `verifyAdminAccessSecretKey -> isSuperAdmin, ${JSON.stringify(
            isSuperAdmin
          )}`
        );

        return {
          statusCode: 200,
          message: 'Success',
          data: isSuperAdmin,
        };
      }

      const admin = await AdminModel.findOne({
        where: {
          id: verifyToken.id,
          email: verifyToken.email,
        },
        raw: true,
      });

      if (!admin)
        return {
          statusCode: 404,
          message: 'Admin not found',
        };

      logger.info(
        `verifyAdminAccessSecretKey -> admin, ${JSON.stringify(admin)}`
      );

      return {
        statusCode: 200,
        message: 'Success',
        data: admin,
      };
    } catch (error) {
      logger.error(`verifyAdminAccessSecretKey -> error: ${error.message}`);
      return {
        statusCode: 400,
        message: error.message,
      };
    }
  }
}
