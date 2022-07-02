const joi = require ('@hapi/joi');



const productValidation = data => {
    const schema = joi.object({
    title: joi.string()
         .required() 
         .unique(),
     desc: joi.string()
         .required(),
     img: joi.string().required(),
     categories: joi.array(),
      size: joi.string(),
     color: joi.string(),
     price: joi.number()
    })
}

module.exports . productValidation =   productValidation;