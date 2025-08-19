import { string, z } from "zod";

const EmailsContactSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  tertiary: z.string(),
});

const PhoneNumsContactSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  tertiary: z.string(),
});

export const ContactInfoType = z.object({
    emailIDs: EmailsContactSchema,
    phoneNums: PhoneNumsContactSchema
})

export const SignupType = z.object({
  username: z.string().default(""),
  password: z.string(),
  email: z.string()
});

export const SigninType = z.object({
    email:z.string(),
    password:z.string()
})

