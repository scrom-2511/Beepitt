import { string, z } from "zod";

export const SignupType = z.object({
  username: z.string().default(""),
  password: z.string(),
  email: z.string(),
});

export const SigninType = z.object({
    email:z.string(),
    password:z.string()
})

export const ContactInfoType = z.object({
    emailIDs: z.array(z.string().email()),
    phoneNums: z.array(z.string())
})