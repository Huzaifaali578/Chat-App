import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        default: ""
    },
    videoUrl: {
        type: String,
        default: ""
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const conversationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    reciever: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: mongoose.Schema.ObjectId,
        ref: "Message",
        required: true
    }
}, {
    timestamps: true
});

export const messageModel = mongoose.model("Message", messageSchema)
export const conversationModel = mongoose.model("Conversation", conversationSchema);
