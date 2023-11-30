import joi from 'joi';
import { ADMIN_TYPES } from '../../../utils/constant/options';

export const createAdminSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
  password: joi.string().min(6).max(30).required(),
  role: joi.array().items(joi.string().valid(...Object.values(ADMIN_TYPES))).optional(),
});

export const adminLoginSchema = joi
  .object({
    username: joi.string(),
    email: joi.string().email(),
    password: joi.string().min(6).max(30).required(),
  })
  
