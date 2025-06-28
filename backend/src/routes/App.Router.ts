import { Router, Request, Response } from "express";
import { sendEmailController } from "../controllers/SendEmail.Controller";

export const appRouter = Router();

appRouter.post("/sendEmail", (req: Request, res: Response) => { sendEmailController(req, res) })
