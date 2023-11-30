import mongoose from 'mongoose';
import { MAIL_OPTIONS } from '../utils/constant/options';

const EmailSchema = new mongoose.Schema(
  {
    grantType: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    tokenType: {
      type: String,
      required: true,
    },
    expiresInSeconds: {
      type: Number,
      required: true,
    },
    notificationType: {
      type: String,
      enum: Object.values(MAIL_OPTIONS),
      default: MAIL_OPTIONS.SEND_PULSE,
    },
  },
  {
    timestamps: true,
  }
);

const EmailModel = mongoose.model('Email', EmailSchema);

export default EmailModel;
