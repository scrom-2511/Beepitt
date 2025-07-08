import argon2 from "argon2";

export const hashData = async (password: string) => {
  return await argon2.hash(password);
};

export const verifyHashedData = async (password: string, hash: string) => {
  return await argon2.verify(hash, password);
};
