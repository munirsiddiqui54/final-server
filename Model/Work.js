import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    team: {
        type: mongoose.ObjectId,
        ref: 'teams'
    },
    username: {
        type: String,
    },
    url: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model('work', userSchema);