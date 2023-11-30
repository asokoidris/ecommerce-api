import express from 'express';
import UserController from '../controller/userController';
import validate from '../../../validation/validatorClass';
import { updateUserSchema, inviteBusinessSchema } from '../validation/user';
import AuthenticationMiddleware from '../../../middleware/authMiddleware';

const router = express.Router();

router.get(
  '/profile',
  AuthenticationMiddleware.isUserAuthenticated,
  UserController.getUserProfileController
);

router.put(
  '/profile',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(updateUserSchema),
  UserController.updateUserController
);

router.post(
  '/invite/business',
  AuthenticationMiddleware.isUserAuthenticated,
  validate(inviteBusinessSchema),
  UserController.inviteBusinessController
);

export default router;
