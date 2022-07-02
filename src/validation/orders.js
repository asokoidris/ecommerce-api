const joi = require ('@hapi/joi');


const orderValidation = data => {
    const schema = joi.object({
        userId: joi.string().required(),
        products: joi.array(),
        productId: joi.string(),
        quantity: joi.string(),
        amount: joi.number().required(),
        address: joi.object().required(),
        status: joi.string(),

    })
}


module.exports .orderValidation = orderValidation;