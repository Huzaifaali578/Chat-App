import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"]
    },
    email: {
        type: String,
        required: [true, "Provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Provide Password"]
    },
    profile_pic: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);

export default userModel;