import mongoose, { mongo, Schema } from "mongoose";
import { IMessage } from "../Interface/Message.interface";

const MessageSchema = new mongoose.Schema<IMessage>({
  senderId:{
    ref: 'User',
    type: String,
    required: true,

  },
  receiverId:{
    ref: 'User',
    type: String,
    required: true,
  },
  // name: {
  //   type: String,
  //   required: true,
  // },
  // email: {
  //   type: String,
  //   required: true,
  // },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, 

});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
