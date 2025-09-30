import mongoose, { mongo } from "mongoose";
import { IMessage } from "../Interface/Message.interface";

const MessageSchema = new mongoose.Schema<IMessage>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
