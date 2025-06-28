import { Request, Response } from "express";
import { User } from "../models/User.model";
import { verifyPassword } from "../utilities/PasswordHasher.Utility";
import { SigninType } from "../types/Auth.Type";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"

dotenv.config();

const jwt_secret = process.env.JWT_SECRET!;

export const signin = async (
  req: Request,
  res: Response
) => {
  const validateData = SigninType.safeParse(req.body);
  if (!validateData.success)
    return res.json({ message: "Enter the values properly." });

  const user = await User.findOne({ email: validateData.data.email });
  if (!user || !user.password)
    return res.json({ message: "There is no user with these email" });
  else if (!(await verifyPassword(validateData.data.password, user.password)))
    return res.json({ message: "Enter the correct password!" });

  const userId = user.id;
  const token = jwt.sign({ userId }, jwt_secret);
  return res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    })
    .json({ message: "Signin successfull", success: true });
};
