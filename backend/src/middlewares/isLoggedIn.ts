import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const isLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
    // console.log(req.body.err)
    if (!jwtSecret) {
        console.error("JWT_SECRET not set");
        res.status(500).json({ message: "Server error", success: false });
        return;
    }

    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({ message: "Token required", success: false });
        return;
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token", success: false });
    }
};
