const joi = require('joi');

class UserValidate {


    static async validateUser(req, res, next) {
        try {
            const schema = await joi.object({
                username: joi.string()
                    .require()
                    .unique()
                    .trim(),

                    email: joi.string()
                    .require()
                    .unique()
                    .trim(),

                    password: joi.string()
                    .require()
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