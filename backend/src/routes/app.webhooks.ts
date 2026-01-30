import { Router } from "express";
import { telegramBotWebhook } from "../webhooks/telegramBot.webhook";

export const appWebhook = Router();

appWebhook.post("/telegramBot", telegramBotWebhook);