import { Router } from "express";
import { signup } from "../controllers/Signup.Controller";
import { signin } from "../controllers/Signin.Controller";
import { updateContactInfo } from "../controllers/updateContactInfo.Controller";

export const userRouter = Router();

userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
userRouter.post("/contactInfoUpdate", updateContactInfo)