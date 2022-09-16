const joi = require('joi');


class OrderValidate {
    static async validateOrder(req, res, next) {
        try {
            const schema = await Joi.object({
                userId: Joi.string().required(),
                productId: Joi.string().required(),
                quantity: Joi.number().default(1),
                amount: joi.number().required(),
                address:joi.object().required(),
                status:joi.string().default()
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

module.exports = OrderValidate