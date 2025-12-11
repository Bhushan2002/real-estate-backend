import { Types } from "mongoose";

export interface IMessage{
    senderId: string,
    receiverId: string,
    name: string,
    email: string,
    message: string,
    createdAt: Date,
    updatedAt: Date,

}
