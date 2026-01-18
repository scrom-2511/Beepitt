import { client } from './redisClient';

export const setOtp = async (otp: string, userId: number) => {
  const key = `otp:${userId}`;
  await client.set(key, otp, { expiration: { type: 'EX', value: 300 } });
};

export const verifyOtp = async (userId: number, otp: string) => {
  const key = `otp:${userId}`;
  const storedOtp = await client.get(key);

  if (!storedOtp || storedOtp !== otp) return false;

  await client.del(key);
  return true;
};
