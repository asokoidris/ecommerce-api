const UserAuthService = require ('../service/userAuth')
// const { successResponse, errorResponse } = require('../utils/response');

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
static async userRegController(req, res) {
    try{
        const result = await  UserAuthService.userRegistration(req.body)

        if (result.statusCode === 409) {
          res.status(409).json(err)
        }
      res.status(200).json(result)
    }
 catch (error) {
  res.status(500).json(error.message)
}

 }
 }

// exports.ControllerLogin =  async (req, res) => {
//     try {
//         const user = await User.findOne({ username: req.body.username })
//         !user && res.status(401).json('Wrong credential');
//         const hashedPassword = CryptoJS.AES.decrypt(
//             user.password,
//             process.env.PASS_SEC
//         );
//         const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
//         Originalpassword !== req.body.password &&
//             res.status(401).json('Wrong credential');
//         const accessToken = jwt.sign({
//             id: user._id,
//             isAdmin: user.isAdmin
//         },
//             process.env.JWT_SEC,
//             { expiresIn: "5d" }
//         )

//         const { password, ...others } = user._doc;

//         res.status(200).json({ ...others, accessToken })
//     } catch (err) {
//         res.status(500).json(err)
//     }


// }
module.exports = UserAuthController;