import { Response } from "express";
import { User } from "../models/User.Model";
import { verifyHashedData } from "../utilities/Hasher";
import { SigninType } from "../types/Auth.Type";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { CustomReq } from "../interfaces/CustomReq.Interface";

dotenv.config();

const jwt_secret = process.env.JWT_SECRET!;

export const signin = async (req: CustomReq, res: Response) => {
  try {
    const validateData = SigninType.safeParse(req.body);
    if (!validateData.success) {
      res.json({ message: "Enter the values properly.", success: false });
      return;
    }

    const user = await User.findOne({ email: validateData.data.email });
    if (!user || !user.password) {
      res.json({ message: "There is no user with these email", success: false });
      return;
    } else if (
      !(await verifyHashedData(validateData.data.password, user.password))
    ) {
      res.json({ message: "Enter the correct password!", success: false });
      return;
    }
    const { username } = user;
    const userID = user.id;
    const token = jwt.sign({ userID }, jwt_secret);
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ message: "Signin successfull", success: true, token, username });
    return;
  } catch (error) {
    console.error(error);
    res.json({message: "Internal Server Error!", success: false})
  }
};
