import { Router } from "express";
import { signup } from "../controllers/Signup.Controller";
import { signin } from "../controllers/Signin.Controller";

import { updateUsername } from "../controllers/UpdateUsername.Controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { otpValidator } from "../controllers/OtpValidator.Controller";
import { errMsgsFetch } from "../controllers/ErrMsgsFetch.Controller";
import { getErrMsg } from "../controllers/GetErrMsg.Controller";
import { checkLoggedIn } from "../controllers/CheckLoggedIn.Controller";
import { aiRecommendation } from "../controllers/aiRecommendation.Controller";
import { updateContactInfo } from "../controllers/UpdateContactInfo.Controller";
import { updateAlertSettings } from "../controllers/UpdateAlertSettings.Controller";
import { settingsFetch } from "../controllers/SettingsFetch";
import { updateSolved } from "../controllers/UpdateSolved.Controller";

export const userRouter = Router();

userRouter.get("/isLoggedIn", isLoggedIn, checkLoggedIn)
userRouter.post("/signup", signup)
userRouter.post("/otpValidator", otpValidator)
userRouter.post("/signin", signin)
userRouter.post("/updateUsername", isLoggedIn, updateUsername)
userRouter.post("/updateContactInfo", isLoggedIn, updateContactInfo)
userRouter.post("/updateAlertSettings", isLoggedIn, updateAlertSettings)
userRouter.post("/updateSolved", isLoggedIn, updateSolved)
userRouter.get("/errMsgsFetch", isLoggedIn, errMsgsFetch)
userRouter.get("/getErrMsg/:errMsgID", isLoggedIn, getErrMsg)
userRouter.get("/aiRecommendation/:errMsgID", isLoggedIn, aiRecommendation)
userRouter.get("/settingsFetch", isLoggedIn, settingsFetch)