import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/request";
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { getUser } from "../Function/User.function";
import { IUserDetails } from "../Interface/User.interface";
import { IAuth } from "../Interface/Auth.interface";

export default async function AuthMiddleware(
    req: IAuth,
    res: Response,
    next: NextFunction
){
    try{
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token){
            return ErrorHandler(res, "please enter valid token");
        }
        
        const decodedToken = jwt.verify(
            token,
            process.env.JWTSECRET!,
        ) as JwtPayload;

        const user = await getUser(decodedToken?._id);

        // Ensure the user exists in the database
        if (!user) {
            return ErrorHandler(res, "User not found.");
        }

        req.user = user as IUserDetails;

        next();

    } catch (e) {
        if (e instanceof TokenExpiredError) {
            return ErrorHandler(res, "Token expired, please login again.");
        }
        if (e instanceof JsonWebTokenError) {
            return ErrorHandler(res, "Invalid token.");
        }
        return ErrorHandler(res, "An unexpected error occurred during authentication.");
    }
}