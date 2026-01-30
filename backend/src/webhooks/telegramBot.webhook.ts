import { Request, Response } from "express";
import { bot } from "../utils/telegramBeep.utils";

export const telegramBotWebhook = async (req: Request, res: Response) => {
  console.log(req.body);

  bot.processUpdate(req.body);

  res.sendStatus(200);
};
