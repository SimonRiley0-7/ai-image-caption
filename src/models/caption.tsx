// models/caption.js
import mongoose from 'mongoose';

// Define the schema first
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

// Create the model with the schema
const Caption = mongoose.models.Caption || mongoose.model('Caption', captionSchema);

export default Caption;