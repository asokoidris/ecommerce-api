import joi from 'joi';
import { CATEGORY_OR_SUBCATEGORY_STATUS } from '../../../utils/constant/options';

export const createCategorySchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  status: joi
    .string()
    .valid(...Object.values(CATEGORY_OR_SUBCATEGORY_STATUS))
    .required(),
  metrics: joi.array().required(),
});

export const updateCategorySchema = joi
  .object({
    id: joi.string().required(),
    metrics: joi.array(),
    name: joi.string(),
    description: joi.string(),
    status: joi
      .string()
      .valid(...Object.values(CATEGORY_OR_SUBCATEGORY_STATUS)),
  })

export const validateIdSchema = joi.object({
  id: joi.string().required(),
});

export const createSubcategorySchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  categoryIds: joi.array().items(joi.string()).required(),
  status: joi
    .string()
    .valid(...Object.values(CATEGORY_OR_SUBCATEGORY_STATUS))
    .required(),
});

export const updateSubCategorySchema = joi.object({
  id: joi.string().required(),
  name: joi.string(),
  description: joi.string(),
  categoryIds: joi.array().items(joi.string()).required(),
  status: joi.string().valid(...Object.values(CATEGORY_OR_SUBCATEGORY_STATUS)),
});

export const validateSlugSchema = joi.object({
  slug: joi.string().required(),
});
