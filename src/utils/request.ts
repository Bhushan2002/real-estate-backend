import { Response } from "express";
import mongoose from "mongoose";

export const SuccssHandler = (res: Response, data: any, message: string) => {
  return res.status(200).json({
    success: true,
    message: message,
    data,
  });
};

export const ErrorHandler = (res: Response, message: string) => {
  return res.status(404).json({
    success: false,
    message: message,
  });
};

export const ServerErrorHandler = (res: Response, error: any) => {
  console.error(error);

  if (error instanceof mongoose.Error.ValidationError) {
    const errors: string[] = Object.values(error.errors).map(
      (err: any) => err.message,
    );
    return res.status(500).json({
      success: false,
      message: "Validation Error",
      error: errors,
    });
  } else if (error?.code === 11000) {
    return res.status(500).json({
      success: false,
      message: "Duplicate Key Errors",
      error: error.keyValue,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error,
  });
};

export const InvalidUserHandler = (res: Response) => {
  return res.status(401).json({
    success: false,
    message: "Not authorized to access this route",
  });
};
