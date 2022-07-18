const jwt = require('jsonwebtoken');
const keys = require('../config/key');
const HelperFunction = require ('../utils/helper-function')

class Token {
  /**
   * @description function to generate a token
   * @param {Object} admin - req body object from the Diagnostic Center controller
   * @returns {Object} - Returned objects
   **/
  static async generateAdminAccessSecretKey(admin) {
    const payload = {
      id: admin.admin_id,
      username: admin.username,
    };
    const options = {
      expiresIn: keys.jwt.expires,
    };
    const token = await jwt.sign(payload, keys.jwt.secret, options);
    return token;
  }

  /**
   * @description function to verify an admin access token
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   */
  static async verifyAdminAccessSecretKey(adminAccessSecretToken) {
    const verifyToken = await jwt.verify(
      adminAccessSecretToken,
      keys.jwt.secret
    );

    const admin = await AdminService.getAdminByIdUsernameAndRole(verifyToken);

    if (!admin)
      return {
        statusCode: 404,
        message: 'Admin not found',
      };

    return {
      statusCode: 200,
      message: 'Success',
      data: admin,
    };
  }

  /**
   * @description function to generate a token for touch point
   * @param {Object} client - req body object from the Diagnostic Center controller
   * @returns {Object} - Returned objects
   */
  static async generateUserAccessToken(User) {
    const payload = {
        id: userAccessToken.userAccessTokenId
    };
    const options = {
      expiresIn: keys.jwt.expires,
    };
    const token = await jwt.sign(payload, keys.jwt.secret, options);
    return token;
  }

  /**
   * @description function to verify a touch point access token
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   */
  static async verifyTouchPointAccessSecretKey(touchPointAccessSecretToken) {
    const verifyToken = await jwt.verify(
      touchPointAccessSecretToken,
      keys.jwt.secret
    );

    const touchPoint = await TouchPointService.getTouchPointByIdService(
      verifyToken.id
    );

    if (touchPoint.statusCode === 404)
      return {
        statusCode: 404,
        message: 'Touch Point not found',
      };

    return {
      statusCode: 200,
      message: 'Success',
      data: touchPoint,
    };
  }
}

module.exports = Token;
