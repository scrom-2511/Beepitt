import { RequestHandler, Response } from "express";
import { CustomReq } from "../interfaces/CustomReq.Interface";
import { Otp } from "../models/Otp.Model";
import { verifyHashedData } from "../utilities/Hasher";

export const otpValidator: RequestHandler = async (req: CustomReq, res: Response) => {
    try {
        const { otp, email } = req.body;
        const otpData = await Otp.findOne({ email });
        if( !otpData || !otpData.otp ){
            res.json({ message:"There is no user with this email", success: false })
            return
        }
        const validateOtp = await verifyHashedData( String(otp), otpData.otp )
        if( !validateOtp ){
            res.json({ message:"Otp you entered is wrong.", success: false })
            return
        }
        res.json({ message: "Otp Verified!", success: true })
        return;
    } catch (error) {
        console.log(error)
        res.json({ message:"Internal Server Error", success: false })
        return;
    }
}