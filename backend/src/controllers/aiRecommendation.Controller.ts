import { RequestHandler, Response } from "express";
import { CustomReq } from "../interfaces/CustomReq.Interface";
import { ErrorMsg } from "../models/ErrorMsg.Model";
import { ErrMsg, ErrMsgObj } from "../interfaces/ErrMsg.Interface";
import { aiRecommendationUtil } from "../utilities/AiRecommendation.Util";

export const aiRecommendation: RequestHandler = async (req: CustomReq, res: Response) => {
    try {
        const { errMsgID } = req.params;

        if (!errMsgID) {
            console.log("errMsgID is not present.")
            res.json({ message: "There was some problem, please reload the page.", success: false })
            return;
        }

        const errMsg = await ErrorMsg.findById(errMsgID);
        if (!errMsg) {
            console.log("There is no errMsg with this ID.")
            res.json({ message: "There is not err message.", success: false })
            return;
        }


        const aiResponse = await aiRecommendationUtil(errMsg.errMsgObj as ErrMsgObj)
        errMsg.aiRecommendation = aiResponse || ""
        await errMsg.save();

        if (!aiResponse) {
            console.log("There was some err getting the ai response.")
            res.json({ message: "Internal Server Err", success: false })
            return;
        }
        res.json({ message: "Ai response successfull", success: true, aiResponse })
        return;
    } catch (error) {
        console.log(error)
        res.json({ message: "Internal Server Err", success: false })
        return;
    }
};