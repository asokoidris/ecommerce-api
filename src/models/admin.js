import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2';


const AdminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true, 
    },
    lastName: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true, 
    },
    role: {
        type: [String],
        default: ['Admin'],
    },
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
    },
}, {
    timestamps: true,
});

AdminSchema.plugin(mongoosePaginate);
const AdminModel = mongoose.model('Admin', AdminSchema);

export default AdminModel;
