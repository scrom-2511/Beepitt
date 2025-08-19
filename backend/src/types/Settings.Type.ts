import { z } from "zod";

const contactInfoSchema = z.object({
    emailIDs: z.object({
        primary: z.string().default(""),
        secondary: z.string().default(""),
        tertiary: z.string().default(""),
    }),
    phoneNums: z.object({
        primary: z.string().default(""),
        secondary: z.string().default(""),
        tertiary: z.string().default(""),
    }),
});

export const SettingsType = z.object({
    userID: z.string(),
    username: z.string().default(""),
    alertPause: z.boolean().default(false),
    alertPauseOnPhoneCall: z.boolean().default(false),
    lastRecharge: z.coerce.date().default(new Date(0)),
    contactInfo: contactInfoSchema.default({
        emailIDs: {
            primary: "",
            secondary: "",
            tertiary: "",
        },
        phoneNums: {
            primary: "",
            secondary: "",
            tertiary: "",
        },
    }),
});

export const AlertSettingsType = SettingsType.pick({alertPause: true, alertPauseOnPhoneCall:true})