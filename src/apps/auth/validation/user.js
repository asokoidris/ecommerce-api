const joi = require('joi');

export const createUserSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
  password: joi.string().required(),
});

export const loginUserSchema = joi
  .object({
    email: joi.string().email(),
    password: joi.string().min(6).max(30).required(),
    phone: joi.string(),
    emailVerified: joi.boolean(),
  })
  .or('username', 'email');

export const changePasswordSchema = joi.object({
  oldPassword: joi.string().min(6).max(30).required(),
  newPassword: joi.string().min(6).max(30).required(),
  confirmNewPassword: joi.string().min(6).max(30).required(),
});

export const forgetPasswordSchema = joi.object({
  email: joi.string().email().required(),
  mobile: joi.boolean().default(false),
});

export const resetPasswordSchema = joi.object({
  token: joi.string().required(),
  email: joi.string().email().when('mobile', {
    is: true,
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  mobile: joi.boolean().default(false),
  newPassword: joi.string().min(6).max(30).required(),
  confirmPassword: joi.string().min(6).max(30).required(),
});
