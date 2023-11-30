import mongoose from 'mongoose';
import {
  USER_TYPE,
  VERIFICATION_TYPE,
  NOTIFICATION_CHANNELS,
  NOTIFICATION_TYPES,
} from '../utils/constant/options';
import { string } from 'joi';

const VerificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  onModel: {
    type: String,
    required: true,
    enum: Object.values(USER_TYPE),
  },
  verificationType: {
    type: String,
    required: true,
    enum: Object.values(NOTIFICATION_TYPES),
  },
  notificationType: {
    type: String,
    required: true,
    enum: Object.values(NOTIFICATION_CHANNELS),
  },
  token: {
    type: String,
    required: true,
  },
  expiryTime: {
    type: Date,
    default: Date.now,
    index: { expires: '15m' },
  },
  trials: {
    type: Number,
    default: 0,
  },
});

const VerificationModel = mongoose.model('Verification', VerificationSchema);

export default VerificationModel;
