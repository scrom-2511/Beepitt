import { z } from "zod";

export const OtpType = z.object({
    otp: z.string(),
    email: z.string()
})