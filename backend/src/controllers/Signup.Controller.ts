import { Request, Response } from "express";
import dotenv from "dotenv";
import { SignupType } from "../types/Auth.Type";
import { User } from "../models/User.Model";
import crypto from "crypto"
import { Otp } from "../models/Otp.Model";
import { hashData } from "../utilities/Hasher";

dotenv.config();

export const signup = async ( req: Request, res: Response ) => {
  try {
    const validateData = SignupType.safeParse(req.body);

    if (!validateData.success) {
      res.status(400).json({
        message: validateData.error,
      });
      return;
    }

    const userExists = await User.findOne({ email: validateData.data.email });
    if (userExists) {
      res.status(400).json({
        message: "An account with this email already exists!",
      });
      return;
    }

    const password = await hashData(validateData.data.password);

    const { username, email } = validateData.data;
    const newUser = await User.create({ username, password, email });
    const otp = crypto.randomInt(100000, 1000000);
    console.log(otp)
    const newOtp = await Otp.create({email, otp})
    res
      .status(201)
      .json({ message: "Signup successfull", success: true });
      return;
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
