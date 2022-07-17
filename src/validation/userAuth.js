const joi = require ('@hapi/joi');



// REGISTER VALIDATION

const registerValidation = data => {
    const schema = joi.object({
        username: joi.string()
        .min(6)
        .required()
        .unique(),

        email:  joi.string()
                .email()
               .required()
               .unique(),
         password: joi.string()
                  .min(6)
                  .required()
                  .unique(),

           isAdmin: joi.boolean()
                      .default(),      
                
    });
    return schema.validate(data);

}



// LOGIN VALIDATION


const loginValidation = data => { 
    const schema = joi.object({
        username : joi.string()
                .required(),
                
         email: joi.string()
              .required(),

        password: joi.string()   
                     .required(),
            
    });
    return schema.validate(data)

}

module.exports.registerValidation = registerValidation

module.exports.loginValidation = loginValidation 