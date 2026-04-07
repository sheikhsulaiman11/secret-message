import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 300
    },
    
     roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
});


const roomSchema = new mongoose.Schema({
    name : {type: String, required: true},
    createdAt: {type: Date, default: Date.now}

});


export const Message = mongoose.model("Message", messageSchema);
export const Room = mongoose.model("Room", roomSchema);