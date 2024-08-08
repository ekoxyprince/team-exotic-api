import { ClientDocument } from "../models/client.model";
import { CallbackError, CallbackWithoutResultAndOptionalError } from "mongoose";

export async function beforeSave(
  this: ClientDocument,
  next: CallbackWithoutResultAndOptionalError
) {
  try {
    if (this.isModified("status") || this.isNew) {
      this.updatedAt = new Date(Date.now());
    }
    next();
  } catch (error) {
    next(<CallbackError>error);
  }
}
