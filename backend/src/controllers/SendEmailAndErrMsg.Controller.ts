import { Request, Response } from "express";
import { User } from "../models/User.Model";
import { sendEmail } from "../utilities/SendEmail.Utility";
import { ErrorMsg } from "../models/ErrorMsg.Model";
import { ErrorMsgType } from "../types/ErrorMsg.Type";

export const sendEmailAndErrMsg = async (req: Request, res: Response) => {
    try {
        const { id, filePath, errObj } = req.body;

        const validateData = ErrorMsgType.safeParse(req.body);
        if (!validateData.success) {
            console.log(validateData.error.errors)
            res.status(400).json({ message: "Enter the values properly.", success: false });
            return;
        }

        const user = await User.findById(id);
        if (!user || !user.email) {
            res.status(404).json({ message: "User not found or missing email", success: false });
            return;
        }

        // const body = "<strong>hey</strong>";
        // await sendEmail(user.email, "Beepitt <onboarding@resend.dev>", filePath, body);

        await ErrorMsg.create({ errObj, id, filePath }); // Adjust to match your schema

        res.status(200).json({ message: "Email and error message handled successfully", success: true });
        return;
    } catch (error) {
        console.error("Error in sendEmailAndErrMsg:", error);
        res.status(500).json({ message: "Internal server error", success: false });
        return;
    }
};
