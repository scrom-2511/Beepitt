import { Router, Request, Response } from "express";
import { signup } from "../controllers/Signup.Controller";
import { signin } from "../controllers/Signin.Controller";

export const userRouter = Router();

userRouter.post("/signup", (req: Request, res: Response) => { signup(req, res) })
userRouter.post("/signin", (req: Request, res: Response) => { signin(req, res) })
