const joi = require('joi');

class UserValidate {


    static async validateUser(req, res, next) {
        try {
            const schema = await joi.object({
                username: joi.string()
                    .required()
                    .unique()
                    .trim(),

                    email: joi.string()
                    .required()
                    .unique()
                    .trim(),

                    password: joi.string()
                    .required()
                    .min(6)
                    .max(15),
                    phoneNumber: joi.number(),
                    isAdmin: joi.boolean()
                    .default('false')
            })
        } catch (err) {
            res.status(500).json(err)
        }
    }



}


module.exports = UserValidate