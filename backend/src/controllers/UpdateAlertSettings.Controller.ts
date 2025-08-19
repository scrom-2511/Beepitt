import { RequestHandler, Response } from "express";
import { CustomReq } from "../interfaces/CustomReq.Interface";
import { Settings } from "../models/Settings.model";
import { AlertSettingsType } from "../types/Settings.Type";

export const updateAlertSettings: RequestHandler = async(req: CustomReq, res: Response) => {
    try {
        console.log(req.body)
        const userID = req.userID as string;

        if ( !userID ) {
            console.log("UserID is not provided.")
            res.json({ message: "Please login again and try.", success: false })
            return;
        } else if ( !req.body ) {
            console.log("AlertPause not provided.")
            res.json({ message: "Please provide the info properly.", success: false })
            return;
        }

        const validateData = AlertSettingsType.safeParse(req.body);
        if (!validateData.success) {
            console.log(validateData.error)
      
            res.status(400).json({ message: "Please enter the values properly.", success: false });
            return;
          }

        const user = await Settings.findOneAndUpdate({ userID }, validateData.data)
        if (!user) {
            console.log("User with this email does not exist.")
            res.json({ message: "User with this email does not exist.", success: false })
            return;
        }

        res.json({ message: "Alert Pause Info updated successfully!", success: true })
        return;
    } catch (error) {
        console.log(error)
        res.json({ message: "Internal Server Error", success: false })
        return;
    }
};