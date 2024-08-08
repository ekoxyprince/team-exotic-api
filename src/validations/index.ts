import {
  checkEmail,
  checkPassword,
  checkUser,
  checkUsername,
  checkresetToken,
} from "./rules/user.validation";
import {
  checkCategory,
  checkDurationUnit,
  checkDuration,
  checkFuel,
  checkName,
  checkPerson,
  checkPrice,
  checkService,
  checkTransmission,
  checkDescription,
  checkTripMile,
  checkImages
} from "./rules/cars.validation";
import { Request, Response, NextFunction } from "express";
import { validationResult, FieldValidationError } from "express-validator";
import { ValidationError as CustomValidationError } from "../exceptions/error";
const result: Function = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = <FieldValidationError>errors.array()[0];
    throw new CustomValidationError(error.msg, {
      path: error.path,
      field: error.location,
      value: error.value,
    });
  }
  next();
};
export const signinValidationRules: Function = (): Function[] => {
  return [checkEmail, checkPassword, result];
};
export const forgotPasswordRules: Function = (): Function[] => {
  return [checkEmail, result];
};
export const resetPasswordRules: Function = (): Function[] => {
  return [checkresetToken, checkPassword, result];
};
export const carValidationRules: Function = (): Function[] => {
  return [
    checkCategory,
    checkDurationUnit,
    checkDuration,
    checkFuel,
    checkName,
    checkPerson,
    checkPrice,
    checkService,
    checkTransmission,
    checkDescription,
    checkTripMile,
    checkImages,
    result,
  ];
};
