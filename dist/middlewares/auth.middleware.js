"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../exceptions/error");
const user_model_1 = __importDefault(require("../database/models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers["authorization"] &&
            req.headers["authorization"].split(" ")[1];
        if (!token)
            throw new error_1.AuthenticationError("Invalid auth token");
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        const user = yield user_model_1.default.findById(decoded.id).select({ password: 0 });
        if (!user)
            throw new error_1.AuthorizationError("Unauthorized request received");
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof error_1.AuthenticationError)
            throw new error_1.AuthenticationError(error.message);
        const err = error;
        const newError = new Error(err.message);
        newError.stack = err.stack;
        throw newError;
    }
});
