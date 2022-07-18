
// const Token = require('../utils/token');
const Helper = require('../ulits/password');
const User = require('../model/index')
// const { successResponse, errorResponse } = require('../ulits/response');
/**
 * @description UserAuth Service class
 */
class UserAuthService {
    /**
     * @description function search for a user by email and phone
     * @param {Object} data - req body object from the AuthController
     * @return {Object} Returned object
     */



    static async userRegistration(data) {
        const { username, email, password } = data;

        // const userReg = await User.findById(email)
        const user = await User.findOne({ username: username });

        if (typeof user !== 'undefined' && user !== null) {
            res.status(409).json('user already exit !')

        };
        const hashedPassword = await Helper.hashpassword(password)

        const newUser = await new User(
            {
                username: username,
                email: email,
                phoneNumber: phoneNumber,
                password: hashedPassword,
            }
        );
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
    }
}






module.exports = UserAuthService 
