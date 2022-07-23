const joi = require ('joi');


 class CartValidate{


    static async getCart(req, res, next) {
        try {
            const schema = await Joi.object({
                userId: Joi.string().required(),
                itemId: Joi.string().required,


            })
            await schema.validateAsync(req.body, {
                abortEarly: false,
            })
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async addCart(req, res, next) {
        try {
            const schema = await Joi.object({
                itemId:Joi.string().required(),
                color: Joi.string(),
                size: Joi.string(),
                quantity: Joi.number().default(1),
            })
            await schema.validateAsync(req.body, {
                abortEarly: false,
            })
            next()
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async updateCart(req, res, next) {
        try {
            const schema = await Joi.object({
                itemId:Joi.string().required(),
                color: Joi.string(),
                size: Joi.string(),
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