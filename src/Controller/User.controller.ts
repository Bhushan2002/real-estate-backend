import { Request, Response } from "express";
import { IUserDetails } from "../Interface/User.interface";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  updateUser,
} from "../Function/User.function";
import {
  ErrorHandler,
  InvalidUserHandler,
  ServerErrorHandler,
  SuccssHandler,
} from "../utils/request";
import createToken from "../utils/jwt";
import { Server } from "http";
import { IAuth } from "../Interface/Auth.interface";

export const createUserModel = async (req: Request, res: Response) => {
  try {
    const body: IUserDetails = req.body;
    const userObj = await createUser(body);

    userObj && userObj._id
      ? SuccssHandler(res, userObj, "User created successfully")
      : ErrorHandler(res, "Unable to create user.");
  } catch (e) {
    ServerErrorHandler(res, e);
  }
};

export const getAllUserModel = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    users
      ? SuccssHandler(res, users, "All users fetch success.")
      : ErrorHandler(res, "Unable to fetch  users.");
  } catch (e) {
    ServerErrorHandler(res, e);
  }
};

export const getUserModel = async (req: Request, res: Response) => {
  try {
    const userObj = await getUser(req.params.id);

    userObj && userObj._id
      ? SuccssHandler(res, userObj, "User details found")
      : ErrorHandler(res, "Unable to finduserDetails ");
  } catch (e) {
    ServerErrorHandler(res, e);
  }
};

export const loginUserModel = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { success, user, message } = await loginUser(email, password);
    success
      ? SuccssHandler(
          res,
          {
            email: user?.email,
            accessToken: createToken({ _id: user?._id, role: "user" }),
          },
          message
        )
      : ErrorHandler(res, message);
  } catch (e) {
    ServerErrorHandler(res, e);
  }
};
export const getUserTokenModel = async (req: IAuth, res: Response) => {
  try {
    const { user } = req;
    user && user._id
      ? SuccssHandler(res, user, "user details found")
      : ErrorHandler(res, "Unable to find user details user.");
  } catch (e) {
    ServerErrorHandler(res, e);
  }
};
export const updateUserModel = async (req: IAuth, res: Response) => {
  try {
    const { user } = req;
    const id = req.params.id;
    console.log(id);

    if (id) {
      const body = req.body;

      const userObj = await updateUser(id, body);

      return userObj && userObj._id
        ? SuccssHandler(res, userObj, "User updated Successfully")
        : ErrorHandler(res, "Unable to update user");
    }

    return InvalidUserHandler(res);
  } catch (error) {
    ServerErrorHandler(res, error);
  }
};
export const deleteUserModel = async (req: IAuth, res: Response) => {
  try {
    const id = req.params.id;
    if (id !== null) {
      const userObj = await deleteUser(id);

      return userObj
        ? SuccssHandler(res, userObj, "User Deleted Successfully")
        : ErrorHandler(res, "Unable to Delete user");
    }

    return InvalidUserHandler(res);
  } catch (error) {
    ServerErrorHandler(res, error);
  }
};
