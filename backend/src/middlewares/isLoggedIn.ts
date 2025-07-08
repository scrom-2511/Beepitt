import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomReq } from "../interfaces/CustomReq.Interface";

const jwtSecret = process.env.JWT_SECRET;

export const isLoggedIn = (req: CustomReq, res: Response, next: NextFunction) => {
    if (!jwtSecret) {
        console.error("JWT_SECRET not set");
        res.status(500).json({ message: "Server error", success: false });
        return;
    }

    const token = req.cookies.token;
    console.log(token)

    if (!token) {
        res.status(401).json({ message: "Token required", success: false });
        return;
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        req.body.userID = decoded.userID
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token", success: false });
        return;
    }
};
