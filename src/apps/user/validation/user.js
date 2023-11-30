import joi from 'joi';

export const updateUserSchema = joi
  .object({
    firstName: joi.string().optional(),
    lastName: joi.string().optional(),
    email: joi.string().email().optional(),
    organization: joi.string().optional(),
    city: joi.string().optional(),
    state: joi.string().optional(),
    phone: joi.string().optional(),
    image: joi.string().optional(),
    id: joi.string(),
  })
  .or(
    'firstName',
    'lastName',
    'email',
    'organization',
    'city',
    'state',
    'phone',
    'image'
  );

export const deactivateOrActivateUserSchema = joi.object({
  id: joi.string().required(),
  email: joi.string().email().required(),
});

export const inviteBusinessSchema = joi.object({
  businessName: joi.string().required(),
  address: joi.string().required(),
  state: joi.string().required(),
  city: joi.string().required(),
  phoneNumber: joi.string().required(),
  website: joi.string().optional(),
  businessCategory: joi.array().items(joi.string().hex().length(24)).required(),
  businessSubCategory: joi
    .array()
    .items(joi.string().hex().length(24))
    .required(),
});
