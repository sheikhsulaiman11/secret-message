import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 300
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
});

export default mongoose.model("Message", messageSchema);