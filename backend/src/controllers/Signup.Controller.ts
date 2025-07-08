import { Response } from "express";
import dotenv from "dotenv";
import { SignupType } from "../types/Auth.Type";
import { User } from "../models/User.Model";
import crypto from "crypto"
import { Otp } from "../models/Otp.Model";
import { hashData } from "../utilities/Hasher";
import { OtpType } from "../types/Otp.Type";
import { CustomReq } from "../interfaces/CustomReq.Interface";

dotenv.config();

export const signup = async ( req: CustomReq, res: Response ) => {
  try {
    const validateData = SignupType.safeParse(req.body);

    if (!validateData.success) {
      res.status(400).json({ message: "Please enter the values properly.", success: false});
      return;
    }

    const userExists = await User.findOne({ email: validateData.data.email });
    if (userExists) {
      res.status(400).json({ message: "An account with this email already exists!", success: false});
      return;
    }

    const password = await hashData( validateData.data.password );

    const { username, email } = validateData.data;
    const newUser = await User.create({ username, password, email });

    const createOtp = crypto.randomInt(100000, 1000000);
    const otp = await hashData(String(createOtp))
    console.log(createOtp)

    const validateOtp = OtpType.safeParse({ otp, email })
    if ( !validateOtp.success ) {
      res.status(400).json({ message: "Please enter the otp properly.", success: false });
      return;
    }

    const newOtp = await Otp.create(validateOtp.data)

    res.status(201).json({ message: "Signup successfull", success: true });
    return;
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
