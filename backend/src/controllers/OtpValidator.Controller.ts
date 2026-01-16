import { RequestHandler, Response } from "express";
import { CustomReq } from "../interfaces/CustomReq.Interface";
import { Otp } from "../models/Otp.Model";
import { verifyHashedData } from "../utilities/Hasher";
import { Settings } from "../models/Settings.model";
import { SettingsType } from "../types/Settings.Type";
import { User } from "../models/User.Model";

export const otpValidator: RequestHandler = async (req: CustomReq, res: Response) => {
    try {
        const { otp, email, userID } = req.body;
        console.log(otp)
        const otpData = await Otp.findOne({ email });
        if (!otpData || !otpData.otp) {
            res.json({ message: "There is no user with this email", success: false })
            return
        }
        const validateOtp = await verifyHashedData(String(otp), otpData.otp)
        if (!validateOtp) {
            res.json({ message: "Otp you entered is wrong.", success: false })
            return
        }
        const user = await User.findOne({email});
        if (!user || !user._id) {
            res.status(400).json({ message: "User not found", success: false });
            return;
          }
          
          const validateData = SettingsType.safeParse({ userID: String(user._id) });
          
          if (!validateData.success) {
            console.log(validateData.error);
            res.status(400).json({ message: "Invalid data", success: false });
            return;
          }
          
          const newUserSettings = await Settings.create(validateData.data);
          

        res.json({ message: "Otp Verified!Settings created", success: true })
        return;
    } catch (error) {
        console.log(error)
        res.json({ message: "Internal Server Error", success: false })
        return;
    }
}

