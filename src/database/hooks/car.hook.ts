import { CarDocument } from "../models/car.model";
import { CallbackError, CallbackWithoutResultAndOptionalError } from "mongoose";

export async function beforeSave(
  this: CarDocument,
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
