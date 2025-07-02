import { z } from "zod";

export const ErrorMsgType = z.object({
  id: z.string(),
  errMsg: z.any(),
  filePath: z.string()
});
