import catchasync from "../utilities/catchasync";
import AuthService from "../services/userservices/auth.services";

export const signin = catchasync(async (req, res) => {
  const data = await new AuthService().signin(req["body"]);
  res.status(200).json({
    success: true,
    status: 200,
    message: "Signin successful",
    data,
  });
});

export const forgotPassword = catchasync(async (req, res) => {
  const data = await new AuthService().forgotPassword(req.body);
  res.status(200).json({
    success: true,
    status: 200,
    message: "Reset Token generated",
    data,
  });
});
export const resetPassword = catchasync(async (req, res) => {
  const data = await new AuthService().resetPassword({
    ...req["body"],
    ...req["params"],
  });
  res.status(200).json({
    success: true,
    status: 200,
    message: "Password reset successful",
    data,
  });
});
