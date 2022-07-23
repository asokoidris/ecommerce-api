const joi = require ('joi');

 class UserValidate {


static async getUser(req, res, next) {
    try{
        const schema = await joi.object({
            
        })
    }catch(err){
        res.status(500).json(err)
    }
}


static async updateUser(req, res, next) {
    try{
        const schema = await joi.object({
            
        })
    }catch(err){
        res.status(500).json(err)
    }
}


static async getAllUsers(req, res, next) {
    try{
        const schema = await joi.object({
            
        })
    }catch(err){
        res.status(500).json(err)
    }
}


}


module.exports = UserValidate