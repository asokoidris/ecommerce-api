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

// static async addProduct(req, res, next) {
//     try{
//         const schema = await joi.object({
            
//         })
//     }catch(err){
//         res.status(500).json(err)
//     }
// }


// static async updatProduct(req, res, next) {
//     try{
//         const schema = await joi.object({
            
//         })
//     }catch(err){
//         res.status(500).json(err)
//     }
// }


// static async getAllProduct(req, res, next) {
//     try{
//         const schema = await joi.object({
            
//         })
//     }catch(err){
//         res.status(500).json(err)
//     }
// }





}


module.exports = ProductValidate