const joi = require ('@hapi/joi');



// REGISTER VALIDATION

const registerValidation = data => {
    const schema = joi.object({
        username: joi.string()
        .min(6)
        .require(),

        email:  joi.string()
                .email()
               .require(),
         password: joi.string()
                  .min(6)
                  .require(),

           isAdmin: joi.boolean()       
                
    });
    return schema.validate(data);

}



// LOGIN VALIDATION


const loginValidation = data => { 
    const schema = joi.object({
        username : joi.string()
                   .min(6)
                   .require(),
        password: joi.string()
                     .min(6)   
                     .require()        
    });
    return schema.validate(data)

}

const validate = {registerValidation,loginValidation }

module.exports = validate;