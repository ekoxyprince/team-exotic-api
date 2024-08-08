import { body, check, ValidationChain } from "express-validator";
import User from "../../database/models/user.model";

export const checkEmail: ValidationChain = check("email")
  .notEmpty()
  .withMessage("Email field is required")
  .isEmail()
  .withMessage("Enter a valid email");

export const checkUser: ValidationChain = body("").custom(
  (value: string, { req }) => {
    return User.findOne({ email: req.body.email }).then((user) => {
      if (user) return Promise.reject("User already exists");
    });
  }
);

export const checkUsername: ValidationChain = body("username")
  .notEmpty()
  .withMessage("Username field is required");

export const checkPassword: ValidationChain = body("password")
  .notEmpty()
  .withMessage("Password Field is required")
  .isLength({ min: 8 })
  .withMessage("Password must be atleast 8 characters");

export const checkresetToken = check("resetToken")
  .notEmpty()
  .withMessage("Invalid reset token")
  .isLength({ min: 32 })
  .withMessage("Invalid reset token");
