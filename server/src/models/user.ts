import { Schema, model } from "mongoose";
import validator from "validator";
interface UserModelType extends Document {
    _id: string,
    username: string,
    email: string,
    password: string,
    avatar: string,
    role: string,
    gender: string,
    createdAt: Date;
    updatedAt: Date;
}
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

const User = model<UserModelType>("user", UserSchema);

export default User;