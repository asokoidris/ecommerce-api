const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require('../model/users')

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
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hashedPassword,
            });
            const savedUser = await newUser.save();
            res.status(200).json(savedUser)
        }
        catch (error) {
            res.status(500).json(error.message)
        }

    }


    static async userSignIn(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });
            !user && res.status(404).json('user not found');

            const isMatchPassword = await bcrypt.compare(req.body.password, user.password);
            !isMatchPassword && res.status(404).json('Wrong password');
            const accessToken = jwt.sign({
                id: user._id
            },
                process.env.JWT_SEC,
                process.env.EXP_SEC
            );

            const { password, updateAt, ...others } = user._doc;

            res.status(200).json({ ...others, accessToken })
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}
module.exports = UserAuthController;