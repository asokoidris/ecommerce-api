import mongoose from 'mongoose';

const SeededRegistrySchema = new mongoose.Schema({
  category: {
    type: Boolean,
    default: false
  },
  categoryCount: {
    type: Number,
    default: 0
  },
  subCategory: {
    type: Boolean,
    default: false
  },
  subCategoryCount: {
    type: Number,
    default: 0
  }
});


const SeededRegistryModel = mongoose.model('SeededRegistry', SeededRegistrySchema);

export default SeededRegistryModel;