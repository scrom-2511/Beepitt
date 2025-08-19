import { z } from "zod";

export const ErrorMsgType = z.object({
  userID: z.string(),
  errMsgObj: z.object({
    errName: z.string(),
    errMsg: z.string(),
    errStack: z.string()
  }),
  filePath: z.string(),
  solved: z.boolean().default(false),
  aiRecommendation: z.string().default("")
});
