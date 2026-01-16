import { RequestHandler, Response } from "express";
import { CustomReq } from "../interfaces/CustomReq.Interface";
import { ErrorMsg } from "../models/ErrorMsg.Model";

export const updateSolved: RequestHandler = async (req: CustomReq, res: Response) => {
    try {
        const { errMsgID } = req.body;
        const userID = req.userID;
        console.log("reached")
        if (!userID) {
            console.log("UserID is not provided.")
            res.json({ message: "Please login again and try.", success: false })
            return;
        } else if (!errMsgID) {
            console.log("MsgID not provided.")
            res.json({ message: "There was a server err!", success: false })
            return;
        }

        const errMsg = await ErrorMsg.findByIdAndUpdate(errMsgID, { solved: true })
        if (!errMsg) {
            console.log("User with this errMsgID does not exist.")
            res.json({ message: "User with this errMsgID does not exist.", success: false })
            return;
        }

        res.json({ message: "Solved updated successfully!", success: true })
        return;
    } catch (error) {
        console.log(error)
        res.json({ message: "Internal Server Error", success: false })
        return;
    }
};