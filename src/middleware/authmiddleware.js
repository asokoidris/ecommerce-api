import { errorResponse } from '../utils/response';
import UserToken from '../utils/jwt/userToken';
import AdminToken from '../utils/jwt/adminToken';
import UserRepo from '../repository/userRepo';
import { ADMIN_TYPES, USER_TYPE } from '../utils/constant/options';

/**
 * @description Authentication Controller class
 */
export default class AuthenticationMiddleware {
  /**
   * @description return a JSON data
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @param {Function} next - Next function
   * @return {Object} Returned object
   */
  static async isUserAuthenticated(req, res, next) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return errorResponse(res, 499, 'Token required');
      }

      const token = await UserToken.decodeToken(
        authorization.toString().substr(7)
      );

      if (!token) {
        return errorResponse(res, 498, 'Invalid token');
      }

      const user = await UserRepo.findUserById(token.subject, true);

      if (!user) {
        return errorResponse(res, 401, 'Invalid user token');
      }

      req.user = { ...user, userType: USER_TYPE.USER };

      return next();
    } catch (err) {
      logger.error(
        `Error in authenticating user: ${JSON.stringify(err.message)}`
      );
      return errorResponse(res, 500, 'Invalid Or Expired Token');
    }
  }

  /**
   * @description return a JSON data
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @param {Function} next - Next function
   * @return {Object} Returned object
   */
  static async isAdminAuthenticated(req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res
          .status(401)
          .json({ error: 'No authorization header provided' });
      }

      const tokenParts = authHeader.split(' ');

      if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res
          .status(401)
          .json({ error: 'Malformed authorization header' });
      }

      const bearerToken = tokenParts[1];

      if (!bearerToken) {
        return errorResponse(res, 499, 'Bearer Token needed');
      }

      const token = await AdminToken.verifyAdminAccessSecretKey(bearerToken);

      if (token.statusCode !== 200)
        return errorResponse(res, 498, 'Invalid Bearer Token');

      req.user = token.data;

      return next();
    } catch (err) {
      logger.error(
        `Error in authenticating admin: ${JSON.stringify(err.message)}`
      );
      return errorResponse(res, 500, 'Invalid Or Expired Token');
    }
  }

  /**
   * @description return a JSON data
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @param {Function} next - Next function
   * @return {Object} Returned object
   */
  static async isSuperAdmin(req, res, next) {
    const { role } = req.user;

    const allowedRole = ADMIN_TYPES.SUPER_ADMIN;
    const roles = Array.isArray(role) ? role : [role];
    const isSuperAdmin = roles.includes(allowedRole);

    if (!isSuperAdmin)
      return errorResponse(
        res,
        403,
        'Access denied. You are not authorized to access this route, only super admin is allowed.'
      );

    next();
  }

  /**
   * @description return a JSON data
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @param {Function} next - Next function
   * @return {Object} Returned object
   */
  static isAllowedToAccessRoute(allowedRoles) {
    return (req, res, next) => {
      const { role } = req.user;

      const rolesArray = Array.isArray(role) ? role : [role];
      const roleUpperCase = rolesArray.map((role) => role.toUpperCase());
      const allowedRolesUpperCase = allowedRoles.map((role) =>
        role.toUpperCase()
      );

      const roles = Array.isArray(roleUpperCase)
        ? roleUpperCase
        : [roleUpperCase];
      const isAdmin = roles.some((role) =>
        allowedRolesUpperCase.includes(role)
      );

      if (!isAdmin)
        return errorResponse(res, 403, 'Access denied. You are unauthorized');

      next();
    };
  }

  /**
   * @description Verify two-factor authentication for the user if enabled
   * @param {string} action - The action string for two-factor authentication
   * @returns {Function} Middleware function for Express.js
   */
  static isTwoFactorAuthVerified(action) {
    return async (req, res, next) => {
      const { id } = req.user;

      // Retrieve the user
      const user = await UserModel.findOne({
        where: {
          id,
        },
        raw: true,
      });

      // If two-factor auth is not enabled for the user, move to the next middleware function
      if (!user.enableTwoFactorAuth) {
        return next();
      }

      if (!req.body.code) {
        return errorResponse(
          res,
          400,
          'Two-factor authentication code is required'
        );
      }

      if (req.body.code.length !== 6) {
        return errorResponse(
          res,
          400,
          'Two-factor authentication code must be 6 characters'
        );
      }

      // Verify the two-factor authentication code
      const verificationResult =
        await TwoFactorService.verifyTwoFactorAuthCodeService(req.user, {
          action,
          code: req.body.code,
        });

      // If the verification is not successful, return an error response
      if (!verificationResult.success)
        errorResponse(res, 401, verificationResult.message);

      delete req.body.code;
      next();
    };
  }

  /**
   * @description Dynamic middleware for checking if a user or business is authenticated
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @param {Function} next - Next function
   * @return {Object} Returned object
   */
  static async dynamicAuthentication(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw new Error('Token required');

      const token = authorization.replace(/^Bearer\s/, '');

      const decoded = await UserToken.decodeToken(token);

      if (!decoded) throw new Error('Invalid token');

      switch (decoded.userType) {
        case USER_TYPE.USER:
          await AuthenticationMiddleware.isUserAuthenticated(req, res, next);
          break;
        case USER_TYPE.BUSINESS:
          await AuthenticationMiddleware.isBusinessAuthenticated(
            req,
            res,
            next
          );
          break;
        //NOTE: we can add more user types here if we have more user types
        default:
          throw new Error('Unauthorized user type');
      }
    } catch (error) {
      logger.error(
        `Error in authenticating user: ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 401, 'Unauthorized user');
    }
  }
}
