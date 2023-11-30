import express from 'express';
import MediaController from '../controllers/mediaController';
import validate from '../../../validation/validatorClass';
import upload from '../../../middleware/uploadsMiddleware';
import AuthenticationMiddleware from '../../../middleware/authMiddleware';
import { ADMIN_TYPES } from '../../../utils/constant/options';
import keys from '../../../config/keys';

const router = express();

router.post(
  '/upload',
  AuthenticationMiddleware.dynamicAuthentication,
  upload.single('file'),
  MediaController.uploadSingleFileController
);

//FIXME - not working
router.post(
  '/upload-multiple-files',
  upload.array('files', 10),
  MediaController.uploadMultipleFilesController
);

export default router;
