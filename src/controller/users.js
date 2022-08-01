
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
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }


    static async DeleteUser(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('User has been deleted....')

        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async GetUser(req, res) {
        try {
            const user = await User.findById(req.params.id)
            const { password, ...others } = user._doc;

            res.status(200).json(others)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async GetAllUsers(req, res) {
        const query = req.query.new;
        try {
            const users = query
                ? await User.find().sort({ _id: -1 }).limit(2)
                : await User.find()
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json(err)
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
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}


module.exports = UserController;