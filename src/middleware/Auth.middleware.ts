import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/request";
import jwt, { JwtPayload } from 'jsonwebtoken';
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

        )as JwtPayload;

        const user = await getUser(decodedToken?._id);

        req.user = user as IUserDetails;

        next();


    }catch(e){
        return ErrorHandler(res, "token expired please login again.");
    }

} 