import mongoose from 'mongoose';

const captionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Caption = mongoose.models.Caption || mongoose.model('Caption', captionSchema);

export default Caption;