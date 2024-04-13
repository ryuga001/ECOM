import { Schema, model } from "mongoose";
import validator from "validator";
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please Enter Username"]
    },
    email: {
        type: String,
        unique: [true, "Email Already Exist"],
        required: [true, "Please Enter Email"],
        validate: validator.default.isEmail,
    },
    password: {
        type: String,
        required: [true, "Enter a Password"],
    },
    avatar: {
        type: String,
        default: "DefaultProfileImage.png"
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please Enter Gender"],
    },
}, {
    timestamps: true,
});
const User = model("user", UserSchema);
export default User;
