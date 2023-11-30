import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const MediaSchema = new mongoose.Schema(
  {
    eTag: {
      type: String,
      required: true,
    },
    serverSideEncryption: {
      type: String,
      required: true,
    },
    versionId: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    bucket: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

MediaSchema.plugin(mongoosePaginate);
const MediaModel = mongoose.model('Media', MediaSchema);

export default MediaModel;
