import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { TryCatch } from "../middleware/error.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
dotenv.config();
const SECRET = process.env.JWT_SECRET || "";
export const registerUser = TryCatch(async (req, res, next) => {
    const { username, email, password, avatar, role, gender } = req.body;
    const img = `../uploads/${req.file?.filename}`;
    const NewUser = await User.create({
        username,
        email,
        password,
        avatar: img ? img : avatar,
        role: role,
        gender
    });
    return res.status(200).json({
        message: "User successfully registered",
        success: true,
        data: NewUser,
    });
});
export const loginUser = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    if (password !== user.password) {
        return next(new ErrorHandler("Invalid  Password", 401));
    }
    // jwt token generation 
    const token = jwt.sign({
        _id: user._id
    }, SECRET, {
        expiresIn: "2 day"
    });
    const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    return res.status(200).cookie("token", token, options).json({
        message: "user login successfully",
        success: true,
        // data: user,
    });
});
export const logout = TryCatch(async (req, res, next) => {
    return res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        messsage: "user logged out",
    });
});
export const getUserDetails = TryCatch(async (req, res, next) => {
    const user = await User.findById({ _id: req.userId });
    return res.status(200).json({
        success: true,
        data: user,
    });
});
// export const forgotPassword = TryCatch(
//     async (req: Request<{}, {}, ForgotPasswordRequest>, res: Response, next: NextFunction) => {
//         const user = await User.findOne({ email: req.body.email });
//         if (!user) {
//             return next(new ErrorHandler("User not found", 404));
//         }
//         const resetToken = user.getResetPasswordToken();
//     }
// )
// admin routes controllers
export const getAllUser = TryCatch(async (req, res, next) => {
    const AllUsers = await User.find();
    return res.status(200).json({
        success: true,
        data: AllUsers,
    });
});
export const getSingleUser = TryCatch(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 404));
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
});
export const updateUserRole = TryCatch(async (req, res, next) => {
    const newUserData = {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
    };
    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
    });
});
export const deleteUser = TryCatch(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400));
    }
    return res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
    // we can implement image deletion also here :)
});
