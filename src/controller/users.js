const {
    successResponse,
    loginSuccessResponse,
    errorResponse,
    paginationSuccessResponse,
} = require ('../middleware/respond')
const User = require('../model/users')
const bcrypt = require('bcryptjs')



/**
 * @description User Controller
 */

class UserController {
    /**
     * @description return a JSON data
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     * @return {Object} Returned object
     */

    // UPDATE USER

    static async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true }
            );
            return successResponse(
                res,
                201,
                'User successfully updated',
                updatedUser
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }


    static async DeleteUser(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id)
            return successResponse(
                res,
                201,
                'User successfully deleted',
                updatedUser
            )

        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }

    static async GetUser(req, res) {
        try {
            const user = await User.findById(req.params.id)
            const { password, ...others } = user._doc;

            return successResponse(
                res,
                201,
                'User successfully fetched',
                others
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }

    static async GetAllUsers(req, res) {
        const query = req.query.new;
        try {
            const users = query
                ? await User.find().sort({ _id: -1 }).limit(2)
                : await User.find()
                return successResponse(
                    res,
                    201,
                    'Users successfully fetched',
                    users
                )
        }catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }

    static async UserStats(req, res) {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

        try {
            const data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 },
                    },
                },
            ])
            return successResponse(
                res,
                201,
                'UserData successfully fetched',
                data
            )
        } catch (error) {
            return errorResponse(res, 500, 'Internal Server Error')
        }
    }
}


module.exports = UserController;