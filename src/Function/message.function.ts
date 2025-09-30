import { IMessage } from "../Interface/Message.interface"
import Message from "../Model/Message.Model";


export const createMail=async(body: IMessage)=>{
    return await Message.create(body);
}
