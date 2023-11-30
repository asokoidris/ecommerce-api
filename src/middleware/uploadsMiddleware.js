import multer from 'multer';
import path from 'path';
import fs from 'fs';
import keys from '../config/keys';
import { v4 as uuidv4 } from 'uuid';

// multer configuration to store files locally and pass it to the next middleware
const {
  MEDIA: {
    CONFIG: { FILE_SIZE, FILES, MEDIA_PATH },
  },
} = keys;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(MEDIA_PATH)) {
      fs.mkdirSync(MEDIA_PATH);
    }
    cb(null, MEDIA_PATH);
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

const fileFilter = function (req, file, cb) {
  // accept jepg, png, doc and pdf files only

  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid file type, only JPEG, PNG, DOC and PDF is allowed!'),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: FILE_SIZE,
    files: FILES,
  },
  fileFilter: fileFilter,
});

export default upload;
