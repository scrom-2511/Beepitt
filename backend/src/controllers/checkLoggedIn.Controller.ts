import { RequestHandler, Response } from "express";
import { CustomReq } from "../interfaces/CustomReq.Interface";

export const checkLoggedIn: RequestHandler = (req: CustomReq, res: Response) => {
  try {
    res.json({ message: "The user is logged in.", success: true })
  } catch (error) {
    res.json({ message: "Internal Server Error.", success: false })
  }
};