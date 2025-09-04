import mongoose from "mongoose";
export enum userRoleType {tenant = "tenant", owner="owner"}
export interface IUserDetails extends Document{
    _id: mongoose.Types.ObjectId,
    firstName : string,
    lastName : string,
    phone: string,
    email: string,
    password: string,
    address: string,
    role: userRoleType
}


