import { NextFunction, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomReq } from "../interfaces/CustomReq.Interface";

const jwtSecret = process.env.JWT_SECRET;

export const isLoggedIn: RequestHandler = (req: CustomReq, res: Response, next: NextFunction) => {
    try {
        console.log("Camer htere")
        console.log(req.cookies)
        if (!jwtSecret) {
            console.error("JWT_SECRET not set");
            res.status(500).json({ message: "Server error", success: false });
            return;
        }

        const { token } = req.cookies;
        console.log("Token is ", token)

        if ( !token ) {
            console.log("Token required")
            res.status(401).json({ message: "Token required", success: false });
            return;
        }
        
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        req.userID = decoded.userID
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token", success: false });
        return;
    }
};
