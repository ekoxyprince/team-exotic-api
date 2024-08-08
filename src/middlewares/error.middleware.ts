import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import {
  AuthenticationError,
  AuthorizationError,
  CustomError,
  NotfoundError,
  ValidationError,
} from "../exceptions/error";

interface ErrorHandler
  extends CustomError,
    AuthorizationError,
    AuthenticationError,
    ValidationError {}
export default (
  error: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error)
  const statusCode = error.code || 500;
  res.status(statusCode).json({
    success: false,
    status: "error",
    code: statusCode,
    data: {
      msg: error.message,
      stack: process.env.NODE_ENV == "development" ? error.stack : null,
      value: error.details?.value,
      path: error.details?.path,
      field: error.details?.field,
    },
  });
};

export const notFoundError = (req: Request, res: Response) => {
  throw new NotfoundError("Page not found", {
    path: req.path,
    value: req.url,
    field: "url",
  });
};
