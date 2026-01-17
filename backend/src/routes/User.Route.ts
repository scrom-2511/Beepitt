import { Router } from "express";
import { checkLoggedIn } from "../controllers/checkLoggedIn";
import { signupController } from "../controllers/Signup.Controller";
import { updateProfileController } from "../controllers/updateProfileController";
import { updateTimeZoneAndPreferencesController } from "../controllers/updateTimeZoneAndPreferences.controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";

export const userRouter = Router();

userRouter.get("/isLoggedIn", isLoggedIn, checkLoggedIn);
userRouter.post("/signup", (req, res) => {
  signupController(req, res);
});
userRouter.post("/signin", (req, res) => {
  signupController(req, res);
});
userRouter.post("/validateOtp", (req, res) => {
  validateOtpController(req, res);
});
userRouter.post("updateProfile", isLoggedIn, updateProfileController);
userRouter.post(
  "/updateTimeZoneAndPreferences",
  isLoggedIn,
  updateTimeZoneAndPreferencesController,
);
