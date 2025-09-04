import { Request } from "express";
import {JwtPayload} from 'jsonwebtoken';
import admin from 'firebase-admin';

export interface IAuth extends Request{
    user?: JwtPayload;

}
export interface IAuthRequest extends Request{

    user?: admin.auth.DecodedIdToken & { role?: string; [key: string]: any };
}
