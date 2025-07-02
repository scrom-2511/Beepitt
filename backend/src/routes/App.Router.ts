import { Router, Request, Response } from "express";
import { sendEmailAndErrMsg } from "../controllers/SendEmail.Controller";
import { isLoggedIn } from "../middlewares/isLoggedIn";

export const appRouter = Router();

appRouter.get("/err", isLoggedIn, sendEmailAndErrMsg)
