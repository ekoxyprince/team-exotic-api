"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../database/models/user.model"));
const lodash_1 = __importDefault(require("lodash"));
const error_1 = require("../../exceptions/error");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const crypto_1 = __importDefault(require("crypto"));
class AuthService {
    signin(body) {
        const data = lodash_1.default.pick(body, ["email", "password"]);
        return user_model_1.default.findOne({ email: data.email })
            .then((user) => {
            if (!user)
                throw new error_1.AuthenticationError("Incorrect email or password");
            return bcryptjs_1.default.compare(data.password, user.password).then((doMatch) => {
                if (!doMatch)
                    throw new error_1.AuthenticationError("Incorrect email or password");
                const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.jwt_secret);
                return { accessToken: token };
            });
        })
            .catch((error) => {
            console.log(error);
            if (error instanceof error_1.AuthenticationError) {
                throw new error_1.AuthenticationError(error.message, error.details);
            }
            const newError = new Error(error.message);
            newError.stack = error.stack;
            newError.name = error.name;
            throw newError;
        });
    }
    forgotPassword(body) {
        const data = lodash_1.default.pick(body, ["email"]);
        return user_model_1.default.findOne({ email: data.email })
            .then((user) => {
            if (!user)
                throw new error_1.AuthenticationError("Incorrect email account");
            const resetToken = crypto_1.default.randomBytes(32).toString("hex");
            user["resetToken"] = resetToken;
            user["resetTokenExpires"] = new Date(Date.now() + 1000 * 60 * 30);
            return user.save().then((user) => {
                return {
                    resetToken: user.resetToken,
                    resetTokenExpires: user.resetTokenExpires,
                };
            });
        })
            .catch((error) => {
            if (error instanceof error_1.AuthenticationError)
                throw new error_1.AuthenticationError(error.message, error.details);
            const newError = new Error(error.message);
            newError.stack = error.stack;
            newError.name = error.name;
            throw newError;
        });
    }
    resetPassword(body) {
        const data = lodash_1.default.pick(body, ["resetToken", "password"]);
        return user_model_1.default.findOne({ resetToken: data.resetToken })
            .then((user) => {
            if (!user)
                throw new error_1.AuthenticationError("Invalid reset token");
            user["password"] = data.password;
            user["resetToken"] = undefined;
            user["resetTokenExpires"] = undefined;
            return user.save().then((user) => {
                return null;
            });
        })
            .catch((error) => {
            if (error instanceof error_1.AuthenticationError)
                throw new error_1.AuthenticationError(error.message, error.details);
            const newError = new Error(error.message);
            newError.stack = error.stack;
            newError.name = error.name;
            throw newError;
        });
    }
}
exports.default = AuthService;
