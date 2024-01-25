import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    teamName: {
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

export default mongoose.model('teams', userSchema);