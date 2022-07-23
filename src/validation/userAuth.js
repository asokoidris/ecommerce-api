const joi = require ('joi');


class AuthValidate{

    static async signUpAdmin(req, res, next) {
        try {
            const adminRegisterForm = Joi.object({
                username: Joi.string().required(),
                email: Joi.string().required().email(),
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                role: Joi.array()
                    .required()
                    .items(
                        Joi.string().valid('user')

                    ),
                password: Joi.string()
                    .min(6)
                    .pattern(new RegExp('[^a-z/A-z]'))
                    .required(),
            })
            await adminRegisterForm.validateAsync(req.body, {
                abortEarly: false,
            })
            next()
        } catch (error) {
            res.status(200).json(error.message)
        }
    }

    static async login(req, res, next) {
        try {
            const loginAdminSchema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            }).or('email', 'phoneNumber')
            await loginAdminSchema.validateAsync(req.body, {
                abortEarly: false,
            })
            next()
        } catch (error) {
            res.status(200).json(error.message)
        }
    }

}
module.exports = AuthValidate