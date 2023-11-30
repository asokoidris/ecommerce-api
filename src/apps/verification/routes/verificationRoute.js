import express from 'express';
import validate from '../../../validation/validatorClass';
import VerificationController from '../controller/verificationController';
import AuthenticationMiddleware from '../../../middleware/authMiddleware';
import {
  authInitiateVerificationSchema,
  authVerifyCodeSchema,
} from '../validation/verification';

const router = express.Router();

router.get(
  '/initiate',
  AuthenticationMiddleware.dynamicAuthentication,
  validate(authInitiateVerificationSchema),
  VerificationController.authInitiateVerificationController
);

router.post(
  '/verify',
  AuthenticationMiddleware.dynamicAuthentication,
  validate(authVerifyCodeSchema),
  VerificationController.authVerifyCodeController
);

export default router;
