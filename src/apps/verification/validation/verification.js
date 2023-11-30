import Joi from 'joi';
import {
  VERIFICATION_TYPE,
  NOTIFICATION_CHANNELS,
} from '../../../utils/constant/options';

export const authInitiateVerificationSchema = Joi.object({
  notificationType: Joi.string()
    .valid(NOTIFICATION_CHANNELS.EMAIL, NOTIFICATION_CHANNELS.SMS)
    .default(NOTIFICATION_CHANNELS.EMAIL),
  verificationType: Joi.string()
    .valid(...Object.values(VERIFICATION_TYPE))
    .required(),
});

export const authVerifyCodeSchema = Joi.object({
  token: Joi.number().integer().min(100000).max(999999).required(),
  verificationType: Joi.string()
    .valid(...Object.values(VERIFICATION_TYPE))
    .required(),
});
