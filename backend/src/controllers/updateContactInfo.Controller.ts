import { Request, Response } from "express"
import { User } from "../models/User.Model"
import { ContactInfoType } from "../types/Auth.Type";
import { Types } from "mongoose";
import { CustomReq } from "../interfaces/CustomReq.Interface";

export const updateContactInfo = async (req: CustomReq, res: Response) => {
    try {
        // console.log(req.body)
        const { emailIDs, phoneNums } = req.body
        // console.log(emailIDs, phoneNums)
        const userID = req.userID;

        const validateData = ContactInfoType.safeParse({emailIDs, phoneNums});

        if (!validateData.success) {
            res.json({ success: false, message: "The values are not proper." })
            return
        }

        const user = await User.findByIdAndUpdate(userID, { emailIDs, phoneNums });
        if(!user){
            console.log("User does not exists.")
            res.json({ success: false, message: "User does not exists." })
            return
        }

        res.json({ success: true, message: "Contact info updated" })
        return;
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: "Internal server err." })
        return
    }

}