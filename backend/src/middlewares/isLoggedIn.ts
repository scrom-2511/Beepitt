import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomReq } from "../interfaces/CustomReq.Interface";

const jwtSecret = process.env.JWT_SECRET;

export const isLoggedIn = (req: CustomReq, res: Response, next: NextFunction) => {
    console.log("Camer htere")
    console.log(req.cookies)
    if (!jwtSecret) {
        console.error("JWT_SECRET not set");
        res.status(500).json({ message: "Server error", success: false });
        return;
    }

    // const token = req.cookies.token;
    // console.log(token)

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2ODZjZDg1NWU2MzE2OGUxN2E2NTM5Y2IiLCJpYXQiOjE3NTE5NzMxMjZ9.NPeM1E2p4mRmhlXJNhzFJYSlQskVgqo7EbUfAeEMsSc"

    if (!token) {
        console.log("Token required")
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
