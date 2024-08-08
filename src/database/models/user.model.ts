import mongoose, { Schema, Model, Document } from "mongoose";
import { beforeSave } from "../hooks/user.hook";
import config from "../../config";

export interface UserDocument extends Document {
  [key:string]:any
  email: string;
  password: string;
  username: string;
  resetToken: string | undefined;
  resetTokenExpires: Date | undefined;
  createdAt: Date;
  updatedAt: Date;
  profileImage:string,
  coverImage:string
  lastLoggedIn: Date | null;
  isModified: (path?: string) => boolean;
}

const userSchema: Schema = new Schema<UserDocument>({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  profileImage:{
  type:String,
  required:[true,"Profile pictute is required"],
  default:`${config.server_url}/static/images/profile.jpg`
  },
  coverImage:{
    type:String,
    required:[true,"Cover pictute is required"],
    default:`${config.server_url}/static/images/cover.jpg`
    },
  resetToken: String,
  resetTokenExpires: Date,
  lastLoggedIn: Date,
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
userSchema.pre<UserDocument>("save", async function (next) {
  await beforeSave.call(this, next);
});
const User: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema
);

export default User;
