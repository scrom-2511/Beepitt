import { RequestHandler, Response } from "express";
import { CustomReq } from "../interfaces/CustomReq.Interface";
import { ErrorMsg } from "../models/ErrorMsg.Model";

export const errMsgsFetch: RequestHandler = async (req: CustomReq, res: Response) => {
    try {
        const userID = req.userID;
        if(!userID){
            res.json({message:"UserID not available", success: false})
            return
        }

        const errMsgs = await ErrorMsg.find({userID}).sort({createdAt: -1});
        if(!errMsgs){
            res.json({message:"Err messages not available", success: false})
            return
        }
        res.json({message: "Data extracted successfully!", success: true, errMsgs})
        return;
    } catch (error) {
        console.log(error)
        res.json({message: "Internal Server Error!", success: false})
        return
    }
}