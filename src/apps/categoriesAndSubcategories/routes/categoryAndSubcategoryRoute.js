import express from 'express';
import CategoryAndSubCategoryController from '../controllers/categoryAndSubcategoryController';
import validate from '../../../validation/validatorClass';
import {
  createCategorySchema,
  updateCategorySchema,
  validateIdSchema,
  createSubcategorySchema,
  updateSubCategorySchema,
  validateSlugSchema,
} from '../validation/categoryAndSubcategory';
import AuthenticationMiddleware from '../../../middleware/authMiddleware';

const router = express();

router.post(
  '/category',
  validate(createCategorySchema),
  AuthenticationMiddleware.isAdminAuthenticated,
  CategoryAndSubCategoryController.createCategoryController
);

router.put(
  '/category/:id',
  AuthenticationMiddleware.isAdminAuthenticated,
  validate(updateCategorySchema),
  CategoryAndSubCategoryController.updateCategoryController
);

router.delete(
  '/category/:id',
  AuthenticationMiddleware.isAdminAuthenticated,
  validate(validateIdSchema),
  CategoryAndSubCategoryController.deleteCategoryController
);

router.post(
  '/subcategory',
  AuthenticationMiddleware.isAdminAuthenticated,
  validate(createSubcategorySchema),
  CategoryAndSubCategoryController.createSubcategoryController
);

router.put(
  '/subcategory/:id',
  AuthenticationMiddleware.isAdminAuthenticated,
  validate(updateSubCategorySchema),
  CategoryAndSubCategoryController.updateSubcategoryController
);

router.delete(
  '/subcategory/:id',
  AuthenticationMiddleware.isAdminAuthenticated,
  validate(validateIdSchema),
  CategoryAndSubCategoryController.deleteSubcategoryController
);

router.get(
  '/categories',
  CategoryAndSubCategoryController.getAllCategoriesController
);

router.get(
  '/category/:id',
  validate(validateIdSchema),
  CategoryAndSubCategoryController.getCategoryController
);

router.get(
  '/category/slug/:slug',
  validate(validateSlugSchema),
  CategoryAndSubCategoryController.getCategoryBySlugController
);

router.get(
  '/subcategory/:id',
  validate(validateIdSchema),
  CategoryAndSubCategoryController.getSubCategoryController
);

router.get(
  '/subcategories',
  CategoryAndSubCategoryController.getAllSubcategoriesController
);

router.get(
  '/category/:id/subcategories',
  validate(validateIdSchema),
  CategoryAndSubCategoryController.getCategoryWithSubcategoriesController
);

router.get(
  '/categories/subcategories',
  CategoryAndSubCategoryController.getAllCategoriesWithSubcategoriesController
);

router.get(
  '/category/slug/:slug/subcategories',
  validate(validateSlugSchema),
  CategoryAndSubCategoryController.getCategoryWithSubcategoriesBySlugController
);

export default router;
