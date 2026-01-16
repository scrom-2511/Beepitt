import { RequestHandler, Response } from "express";
import { CustomReq } from "../interfaces/CustomReq.Interface";
import { Settings } from "../models/Settings.model";

export const settingsFetch: RequestHandler = async (req: CustomReq, res: Response) => {
    try {
        const userID = req.userID;
        console.log(userID);

        if (!userID) {
            console.log("UserID is not provided.");
            res.json({ message: "Please login again and try.", success: false });
            return;
        }

        const userSettings = await Settings.findOne({ userID });

        if (!userSettings) {
            console.log("No settings found for this user.");
            res.json({ message: "Settings not found.", success: false });
            return;
        }

        res.json({ message: "Settings fetched successfully.", data: userSettings, success: true });
        return;

    } catch (error) {
        console.log("Error fetching user settings:", error);
        res.json({ message: "Internal Server Error", success: false });
        return;
    }
};
