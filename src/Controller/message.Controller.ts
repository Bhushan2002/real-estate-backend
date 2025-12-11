import { Request, Response } from "express";
import { createMail } from "../Function/message.function";
import { ServerErrorHandler, SuccssHandler } from "../utils/request";
import User from '../Model/User.Model';
import Message from "../Model/Message.Model";
import { IAuth, IAuthRequest } from "../Interface/Auth.interface";

// export const createMessage = async (req: Request, res: Response) => {
//   try {

//     const body = req.body;

//     const messageObj = await createMail(body);

//     if (messageObj) {
//       res.status(201).json({ message: messageObj });
//     } else {
//       res.status(400).json({ message: "something went wrong" });
//     }
//   } catch (e) {
//     res.status(404).json({ message: "server problem." });
//   }
// };


export const sendMessage = async (req: IAuthRequest, res: Response) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user?.uid;

    if (!senderId) {
      return res.status(401).json({ message: "Unauthorized: user not found." });
    }
    if (!receiverId || !message) {
      return res.status(400).json({ message: "receiver Id and message are required." });
    }
    const receierExists = await User.findById(receiverId);
    if (!receierExists) {
      return res.status(404).json({ message: "Receiver not found." });
    }

    const newChat = await Message.create({
      senderId: senderId,
      receiverId: receiverId,
      message,
    });
    return res.status(201).json({ message: "Message sent successfully.", chat: newChat });
  } catch (e) {
    ServerErrorHandler(res, e);
  }
}

export const getChatHistory = async (req: IAuthRequest, res: Response) => {
  try {
    const currentUserId = req.user?.uid;
    const { otherUserId } = req.params;

    if (!currentUserId) {
      return res.status(401).json({ message: "Unauthenticated: user not found." });

    }
    const chats = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: currentUserId }
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json({ chats, messsage: "chat history fetched successfully." });
  }
  catch (e) {
    ServerErrorHandler(res, e);
  }
}

export const getConversations = async (req: IAuthRequest, res: Response) => {
  try {
    const currentUserId = req.user?.uid;
    if (!currentUserId) {
      return res.status(401).json({ message: "Unauthenticated: user not found." });
    }

    const conversations = await Message.find({
      $or: [
        { senderId: currentUserId },
        { receiverId: currentUserId }
      ]
    }).sort({ createdAt: -1 });

    const uniqueUserIds = new Set<string>();
    const conversationList: any[] = [];

    for (const chat of conversations){
      const otherUserId = chat.senderId === currentUserId ? chat.receiverId: chat.senderId;

      if (!uniqueUserIds.has(otherUserId)){
        uniqueUserIds.add(otherUserId);
        conversations.push({
          userId: otherUserId,
          lastMessage: chat.message,
          timestamp: chat.createdAt,
        });
      }
    }

    return SuccssHandler(res, conversations, "Conversations fetched successfully.");
  } catch (error) {
    return ServerErrorHandler(res, error);
  }
}