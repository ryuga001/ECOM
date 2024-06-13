import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { AuthenticatedRequest } from "../utils/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";
import dotenv from "dotenv";
dotenv.config()

const SECRET = process.env.JWT_SECRET || "";
export const isAuthenticatedUser = TryCatch(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const { token } = req.cookies;
        if (!token) {
            return next(new ErrorHandler("Please Login to access this", 401))
        }
        const decodedData = jwt.verify(token, SECRET);
        const currentUser = await User.findById(decodedData);
        if (!currentUser) {
            return next(new ErrorHandler("Error in currentUser ", 401));
        }
        req.userId = currentUser._id;
        next();
    }
)


export const authorizeRoles = (...roles: Array<string>) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const user = await User.findById(req.userId);
        if (!user) {
            return next(new ErrorHandler("Not Logged In", 403));
        }
        if (!roles.includes(user.role)) {
            return next(new ErrorHandler(`Role : ${user.role} is not allowed to access this route `, 403))
        }
        next();
    }
}