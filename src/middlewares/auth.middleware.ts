import { Request, Response, NextFunction } from "express";
import { AuthenticationError, AuthorizationError } from "../exceptions/error";
import User, { UserDocument } from "../database/models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

declare global {
  namespace Express {
    interface Request {
      user?:UserDocument;
      files?:Express.Multer.File[]
    }
  }
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token:string| undefined =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    if (!token) throw new AuthenticationError("Invalid auth token");
    const decoded = <JwtPayload>jwt.verify(token, config.jwt_secret!);
    const user = await User.findById(decoded.id).select({ password: 0 });
    if (!user) throw new AuthorizationError("Unauthorized request received");
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof AuthenticationError)
      throw new AuthenticationError(error.message);
    const err = <Error>error;
    const newError: Error = new Error(err.message);
    newError.stack = err.stack;
    throw newError;
  }
};
