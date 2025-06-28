import { Request, Response } from "express";
import { User } from "../models/User.model";
import { sendEmail } from "../utilities/SendEmail.Utility";

export const sendEmailController = async(req: Request, res: Response)=>{
    try {
        const { id, subject, err } = req.body;
    const user = await User.findOne({_id:id})
    const email = user?.email!;

    const body = '<strong>hey</strong>'

    const sendEmaill = await sendEmail(email, "Buzzitz <onboarding@resend.dev>", subject, body)

    res.send({Success: true})
    } catch (error) {
        console.log("err in", error)
    }
}