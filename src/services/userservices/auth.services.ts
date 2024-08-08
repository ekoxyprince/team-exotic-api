import User from "../../database/models/user.model";
import _ from "lodash";
import { AuthenticationError } from "../../exceptions/error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import crypto from "crypto";

interface reqBody {
  email: string | undefined;
  password: string | undefined;
  username: string | undefined;
  resetToken: string | undefined;
}
interface auth {
  signin(body: reqBody): Promise<object | null>;
  forgotPassword(body: reqBody): Promise<object | null>;
  resetPassword(body: reqBody): Promise<object | null>;
}
export default class AuthService implements auth {
  signin(body: reqBody): Promise<object | null> {
    const data = _.pick(body, ["email", "password"]);
    return User.findOne({ email: data.email })
      .then((user) => {
        if (!user) throw new AuthenticationError("Incorrect email or password");
        return bcrypt.compare(data.password!, user.password).then((doMatch) => {
          if (!doMatch)
            throw new AuthenticationError("Incorrect email or password");
          const token = jwt.sign({ id: user._id }, config.jwt_secret!);
          return { accessToken: token };
        });
      })
      .catch((error: Error) => {
        console.log(error)
        if (error instanceof AuthenticationError){
          throw new AuthenticationError(error.message, error.details);
        }
        const newError = new Error(error.message);
        newError.stack = error.stack;
        newError.name = error.name;
        throw newError;
      });
  }
  forgotPassword(body: reqBody): Promise<object | null> {
    const data = _.pick(body, ["email"]);
    return User.findOne({ email: data.email })
      .then((user) => {
        if (!user) throw new AuthenticationError("Incorrect email account");
        const resetToken = crypto.randomBytes(32).toString("hex");
        user["resetToken"] = resetToken;
        user["resetTokenExpires"] = new Date(Date.now() + 1000 * 60 * 30);
        return user.save().then((user) => {
          return {
            resetToken: user.resetToken,
            resetTokenExpires: user.resetTokenExpires,
          };
        });
      })
      .catch((error: Error) => {
        if (error instanceof AuthenticationError)
          throw new AuthenticationError(error.message, error.details);
        const newError = new Error(error.message);
        newError.stack = error.stack;
        newError.name = error.name;
        throw newError;
      });
  }
  resetPassword(body: reqBody): Promise<object | null> {
    const data = _.pick(body, ["resetToken", "password"]);
    return User.findOne({ resetToken: data.resetToken })
      .then((user) => {
        if (!user) throw new AuthenticationError("Invalid reset token");
        user["password"] = data.password!;
        user["resetToken"] = undefined;
        user["resetTokenExpires"] = undefined;
        return user.save().then((user) => {
          return null;
        });
      })
      .catch((error: Error) => {
        if (error instanceof AuthenticationError)
          throw new AuthenticationError(error.message, error.details);
        const newError = new Error(error.message);
        newError.stack = error.stack;
        newError.name = error.name;
        throw newError;
      });
  }
}
