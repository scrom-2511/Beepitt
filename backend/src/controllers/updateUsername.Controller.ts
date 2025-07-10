import { RequestHandler, Response } from "express";
import { CustomReq } from "../interfaces/CustomReq.Interface";
import { User } from "../models/User.Model";

export const updateUsername: RequestHandler = async (req: CustomReq, res: Response) => {
    try {
        const { username } = req.body;
        const userID = req.userID;

        if ( !userID ) {
            console.log("UserID is not provided.")
            res.json({ message: "Please login again and try.", success: false })
            return;
        } else if ( !username ) {
            console.log("Username not provided.")
            res.json({ message: "Please provide an username", success: false })
            return;
        }

        const user = await User.findByIdAndUpdate(userID, { username })
        if (!user) {
            console.log("User with this email does not exist.")
            res.json({ message: "User with this email does not exist.", success: false })
            return;
        }

        res.json({ message: "Username updated successfully!", success: true })
        return;
    } catch (error) {
        console.log(error)
        res.json({ message: "Internal Server Error", success: false })
        return;
    }
};