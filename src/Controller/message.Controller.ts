import { Request, Response } from "express";
import { createMail } from "../Function/message.function";
import { ServerErrorHandler } from "../utils/request";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const messageObj = await createMail(body);

    if (messageObj) {
      res.status(201).json({ message: messageObj });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (e) {
    res.status(404).json({ message: "server problem." });
  }
};
