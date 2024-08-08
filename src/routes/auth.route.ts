import express from "express";
const router: express.Router = express.Router();
import {
  signinValidationRules,
  forgotPasswordRules,
  resetPasswordRules,
} from "../validations";
import * as controller from "../controllers/auth.controller";

router
  .route("/signin")
  .post(signinValidationRules(), controller.signin);

router
  .route("/forgot_password")
  .post(forgotPasswordRules(), controller.forgotPassword);

router
  .route("/reset_password")
  .post(resetPasswordRules(), controller.resetPassword);
export default router;
