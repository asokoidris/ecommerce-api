const joi = require('@hapi/joi');



const cartValidation = data => {
    const schema = joi.object({
        userId: joi.string()
            .required(),
        products: joi.array(),
        productId: joi.string(),
        quantity: joi.number(),
    })
}


module.exports.cartValidation = cartValidation