const joi = require ('joi');


class ProductValidate{

static async getProduct(req, res, next) {
    try{
        const schema = await joi.object({
            
        })
    }catch(err){
        res.status(500).json(err)
    }
}

static async addProduct(req, res, next) {
    try{
        const schema = await joi.object({
            
        })
    }catch(err){
        res.status(500).json(err)
    }
}


static async updatProduct(req, res, next) {
    try{
        const schema = await joi.object({
            
        })
    }catch(err){
        res.status(500).json(err)
    }
}


static async getAllProduct(req, res, next) {
    try{
        const schema = await joi.object({
            
        })
    }catch(err){
        res.status(500).json(err)
    }
}





}


module.exports = ProductValidate