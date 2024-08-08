import { UserDocument } from "../models/user.model";
import { CallbackError, CallbackWithoutResultAndOptionalError } from "mongoose";
import bcrypt from "bcryptjs";

export async function beforeSave(
  this: UserDocument,
  next: CallbackWithoutResultAndOptionalError
) {
  try {
    if (this.isModified("password") || this.isNew) {
      this.password = await bcrypt.hash(this.password, 12);
      this.updatedAt = new Date(Date.now());
    }
    next();
  } catch (error) {
    next(error as CallbackError);
  }
}
