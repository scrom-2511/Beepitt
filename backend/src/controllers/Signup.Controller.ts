import { User } from "../models/User.model";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { SignupType } from "../types/Auth.Type";
import { hashPassword } from "../utilities/PasswordHasher.Utility";

dotenv.config();

export const signup = async (
  req: Request,
  res: Response
)=> {
  try {
    const validateData = SignupType.safeParse(req.body);

    if (!validateData.success) {
      return res.status(400).json({
        message: validateData.error,
      });
    }

    const userExists = await User.findOne({ email: validateData.data.email });
    if (userExists) {
      return res.status(400).json({
        message: "An account with this email already exists!",
      });
    }

    const password = await hashPassword(validateData.data.password);

    const { username, email } = validateData.data;
    const newUser = await User.create({
      username,
      password,
      email
    });
    return res
      .status(201)
      .json({ message: "Signup successfull", success: true });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
