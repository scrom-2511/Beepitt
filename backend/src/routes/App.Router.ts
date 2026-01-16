import { Router, Request, Response } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { sendEmailAndErrMsg } from "../controllers/SendEmailAndErrMsg.Controller";

export const appRouter = Router();

appRouter.post("/err", sendEmailAndErrMsg)
