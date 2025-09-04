import mongoose from "mongoose";
import { IUserDetails, userRoleType } from "../Interface/User.interface";


const userSchema = new mongoose.Schema<IUserDetails>({

  firstName: {
    type: String,
    required: [true, "first name is required."],
  },
  lastName: {
    type: String,
    required: [true, "last name is required."],
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: { type: String, required: true },
});


const User = mongoose.model<IUserDetails>("User",userSchema) || mongoose
.models.User;

export default User;