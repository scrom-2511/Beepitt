import { z } from "zod";

export const SignupType = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

export const SigninType = z.object({
    email:z.string(),
    password:z.string()
})