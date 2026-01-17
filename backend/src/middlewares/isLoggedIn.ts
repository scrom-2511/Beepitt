import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ERROR_CODES, HttpStatus } from "../types/errorCodes";

const jwtSecret = process.env.JWT_SECRET;

export interface CustomReq extends Request {
  userId: number;
}

export const isLoggedIn = (
  req: CustomReq,
  res: Response,
  next: NextFunction,
) => {
  if (!jwtSecret) {
    console.error("JWT_SECRET not set");
    return res.status(500).json({ message: "Server error", success: false });
  }

  const { authToken } = req.cookies;

  if (!authToken) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      error: ERROR_CODES.UNAUTHORIZED,
    });
  }

  try {
    const decoded = jwt.verify(authToken, jwtSecret) as JwtPayload;
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      error: ERROR_CODES.UNAUTHORIZED,
    });
  }
};
