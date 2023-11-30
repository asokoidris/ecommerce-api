import express from 'express';
import userAuthController from '../controllers/userAuthController';
import validate from '../../../validation/validatorClass';
import {
  createUserSchema,
  loginUserSchema,
  changePasswordSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  mobileVerifySchema,
} from '../validation/user';
import AuthenticationMiddleware from '../../../middleware/authMiddleware';

const router = express.Router();

router.post(
  '/signup',
  validate(createUserSchema),
  userAuthController.createUserAuthController
);

router.post(
  '/login',
  validate(loginUserSchema),
  userAuthController.loginUserAuthController
);

router.patch(
  '/change-password',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(changePasswordSchema),
  userAuthController.changePasswordController
);

router.get(
  '/forgot-password',
  validate(forgetPasswordSchema),
  userAuthController.forgotPasswordController
);

router.patch(
  '/reset-password/:token',
  validate(resetPasswordSchema),
  userAuthController.resetPasswordController
);

export default router;
