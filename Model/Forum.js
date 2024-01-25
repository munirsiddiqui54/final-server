import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    userid: {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    username: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model('forum', userSchema);