import mongoose from "mongoose";
import { IUserDetails } from "../Interface/User.interface";
import User from "../Model/User.Model";

export async function createUser(body: IUserDetails) {
  return await User.create(body);
}
export async function getAllUsers(){
  return await User.find();
}
export async function getUser(id: string) {
  return await User.findById(id);
}
export async function getUserByEmail(email: string) {
  return await User.findOne({ email: email });
}
export async function loginUser(email: string, password: string) {
  const userObj = await getUserByEmail(email);
  if (!userObj) {
    return {
      success: false,
      message: "User not found.",
    };
  } else if (userObj.password !== password) {
    return {
      success: false,
      message: "Incorrect Password is entered.",
    };
  } else {
    return {
      success: true,
      message: "User logged in successfully.",
      user: userObj,
    };
  }
}
export async function updateUser(id: string, body: IUserDetails) {
  return await User.findByIdAndUpdate(id, body, { new: true });
}
export async function deleteUser(id: string) {
  return await User.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
}
