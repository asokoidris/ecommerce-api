const joi = require ('joi');


class ProductValidate{

static async validateProduct(req, res, next) {
    try{
        const schema = await joi.object({
            title: joi.string().required(),
            desc: joi.string().required(),
            image: joi.string().required(),
            categories: joi.array(),
            size: joi.string(),
            color: joi.string(),
            price: joi.number().required()
        })
    }catch(error){
        res.status(500).json(error.message)
    }
}

}


module.exports = ProductValidate