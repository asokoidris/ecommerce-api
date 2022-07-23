const joi = require ('joi');


class OrderValidate{

static async getOrder(req, res, next) {
    try{
        const schema = await joi.object({
            
        })
    }catch(err){
        res.status(500).json(err)
    }
}

static async createOrder(req, res, next) {
    try{
        const schema = await joi.object({
            
        })
    }catch(err){
        res.status(500).json(err)
    }
}


static async updateOrder(req, res, next) {
    try{
        const schema = await joi.object({
            
        })
    }catch(err){
        res.status(500).json(err)
    }
}


static async getAllOrders(req, res, next) {
    try{
        const schema = await joi.object({
            
        })
    }catch(err){
        res.status(500).json(err)
    }
}
}
module.exports = OrderValidate



