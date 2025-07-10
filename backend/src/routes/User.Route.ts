import { Router } from "express";
import { signup } from "../controllers/Signup.Controller";
import { signin } from "../controllers/Signin.Controller";
import { updateContactInfo } from "../controllers/updateContactInfo.Controller";
import { updateUsername } from "../controllers/updateUsername.Controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { otpValidator } from "../controllers/OtpValidator.Controller";
import { errMsgsFetch } from "../controllers/ErrMsgsFetch.Controller";
import { getErrMsg } from "../controllers/GetErrMsg.Controller";
import { checkLoggedIn } from "../controllers/checkLoggedIn.Controller";

export const userRouter = Router();

userRouter.get("/isLoggedIn", isLoggedIn, checkLoggedIn)
userRouter.post("/signup", signup)
userRouter.post("/otpValidator", otpValidator)
userRouter.post("/signin", signin)
userRouter.post("/updateUsername", isLoggedIn, updateUsername)
userRouter.post("/contactInfoUpdate", updateContactInfo)
userRouter.get("/errMsgsFetch", isLoggedIn, errMsgsFetch)
userRouter.get("/getErrMsg/:errMsgID", isLoggedIn, getErrMsg)