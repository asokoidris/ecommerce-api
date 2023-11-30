import express from 'express';
import AdminController from '../controllers/adminAuthController';
import validate from '../../../validation/validatorClass';
import {
  createAdminSchema,
  adminLoginSchema,
} from '../validation/admin';
import AuthenticationMiddleware from '../../../middleware/authMiddleware';
import keys from '../../../config/keys';

const router = express();

router.post(
  `/${keys.ADMIN_URL}/login`,
  validate(adminLoginSchema),
  AdminController.adminLoginController
);

router.post(
  `/${keys.ADMIN_URL}/onboard-admin`,
  AuthenticationMiddleware.isAdminAuthenticated,
  AuthenticationMiddleware.isSuperAdmin,
  validate(createAdminSchema),
  AdminController.onboardAdminController
);


export default router;
