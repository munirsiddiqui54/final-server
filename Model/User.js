import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    googleid: {
        type: String,
        required: true
    }

}, { timestamps: true })

export default mongoose.model('users', userSchema);