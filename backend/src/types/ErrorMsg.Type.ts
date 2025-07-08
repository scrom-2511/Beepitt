import { z } from "zod";

export const ErrorMsgType = z.object({
  id: z.string(),
  errMsgObj: z.object({
    errName: z.string(),
    errMsg: z.string(),
    errStack: z.string()
  }),
  filePath: z.string()
});