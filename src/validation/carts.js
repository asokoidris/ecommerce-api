const joi = require('joi');


class CartValidate {
    static async validateCart(req, res, next) {
        try {
            const schema = await Joi.object({
                userId: Joi.string().required(),
                productId: Joi.string().required(),
                quantity: Joi.number().default(1),
            })
            await schema.validateAsync(req.body, {
                abortEarly: false,
            })
            next()
        } catch (error) {
            return errorResponse(res, 400, error.message)
        }
    }
}

module.exports = CartValidate