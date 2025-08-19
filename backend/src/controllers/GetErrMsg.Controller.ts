import { RequestHandler, Response } from "express";
import { CustomReq } from "../interfaces/CustomReq.Interface";
import { ErrorMsg } from "../models/ErrorMsg.Model";

export const getErrMsg: RequestHandler = async (req: CustomReq, res: Response) => {
    try {
        const { errMsgID } = req.params;

        if (!errMsgID) {
            console.log("errMsgID is not present.")
            res.json({ message: "There was some problem, please reload the page.", success: false })
            return;
        }

        const errMsg = await ErrorMsg.findById( errMsgID );
        if (!errMsg) {
            console.log("There is no errMsg with this ID.")
            res.json({ message: "There is not err message.", success: false })
            return;
        }

        res.json({ message: "errMsg extracted successfully.", success: true, errMsg })
        return;
    } catch (error) {
        console.log(error)
        res.json({ message: "Internal Server Error", success: false })
        return;
    }
};