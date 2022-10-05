const User = require('../model/users');
const HelperFunction = require('../utils/helper');
const jwt = require('jsonwebtoken');
const {
    successResponse,
    loginSuccessResponse,
    errorResponse,
    paginationSuccessResponse,
} = require('../middleware/respond')


/**
 * @description Authentication Controller
 */

class UserAuthController {
    /**
     * @description return a JSON data
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     * @return {Object} Returned object
     */
    static async userSignUp(req, res) {
        try {

            const hashedPassword = await HelperFunction.hashPassword(req.body.password)

            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hashedPassword,
            });
            const registeredUser = await newUser.save();
            return successResponse(
                res,
                201,
                'User successfully registered',
                registeredUser
            )
        }
        catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }

    }


    static async userSignIn(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });
            const isMatchPassword = await HelperFunction.comparePassword(req.body.password, user.password);
            if (!isMatchPassword) {
                return errorResponse(res, 404, 'user not found');
            } else {
                const token = jwt.sign({
                    id: user._id
                },
                    process.env.JWT_SEC,
                    process.env.EXP_SEC
                );

                return loginSuccessResponse(
                    res,
                    200,
                    token,
                    'User successfully logged in',
                    user
                )
                // res.status(200).json({ ...others, accessToken })
            }
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }
}
module.exports = UserAuthController;