import { z } from "zod";

export const LoginType = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignupType = z.object({
  email: z.string().email(),
  username: z.string().email(),
  password: z.string(),
});

export const onErrorFromClientType = z.object({
  userId: z.number(),
  errorName: z.string(),
  errorDesc: z.string(),
  jwtToken: z.string(),
});

export interface ProducerMessage {
  key: string;
  value: string;
}

export const ProfileUpdateType = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export const DateFormat = z.enum([
  "YYYY-MM-DD",
  "MM/DD/YYYY",
  "DD/MM/YYYY",
  "YYYY/MM/DD",
  "MM-DD-YYYY",
  "DD-MM-YYYY",
]);

export const TimeZoneAndPreferencesUpdateType = z.object({
  city: z.string(),
  timeZone: z.string().refine((tz) => {
    try {
      Intl.DateTimeFormat(undefined, { timeZone: tz });
      return true;
    } catch (error) {
      return false;
    }
  }),
  dateFormat: DateFormat,
});
