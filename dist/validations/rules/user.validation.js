"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkresetToken = exports.checkPassword = exports.checkUsername = exports.checkUser = exports.checkEmail = void 0;
const express_validator_1 = require("express-validator");
const user_model_1 = __importDefault(require("../../database/models/user.model"));
exports.checkEmail = (0, express_validator_1.check)("email")
    .notEmpty()
    .withMessage("Email field is required")
    .isEmail()
    .withMessage("Enter a valid email");
exports.checkUser = (0, express_validator_1.body)("").custom((value, { req }) => {
    return user_model_1.default.findOne({ email: req.body.email }).then((user) => {
        if (user)
            return Promise.reject("User already exists");
    });
});
exports.checkUsername = (0, express_validator_1.body)("username")
    .notEmpty()
    .withMessage("Username field is required");
exports.checkPassword = (0, express_validator_1.body)("password")
    .notEmpty()
    .withMessage("Password Field is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters");
exports.checkresetToken = (0, express_validator_1.check)("resetToken")
    .notEmpty()
    .withMessage("Invalid reset token")
    .isLength({ min: 32 })
    .withMessage("Invalid reset token");
