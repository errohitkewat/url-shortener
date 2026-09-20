import mongoose from 'mongoose';


const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});


export const UrlModel = mongoose.model("url", urlSchema);

