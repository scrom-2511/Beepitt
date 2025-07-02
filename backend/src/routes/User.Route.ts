import { Router, Request, Response } from "express";
import { signup } from "../controllers/Signup.Controller";
import { signin } from "../controllers/Signin.Controller";

export const userRouter = Router();

userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
