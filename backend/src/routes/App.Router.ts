import { Router } from "express";
import { onErrorFromClientController } from "../webhooks/onErrorFromClient.webhook";

export const appRouter = Router();

appRouter.post("/err", onErrorFromClientController);
