import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ERROR_CODES, HttpStatus } from '../types/errorCodes';

const jwtSecret = process.env.JWT_SECRET;

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!jwtSecret) {
    console.error('JWT_SECRET not set');
    res.status(500).json({ message: 'Server error', success: false });
    return;
  }

  let { authToken } = req.cookies;
  if(!authToken){
    authToken = undefined
  }

  try {
    const decoded = jwt.verify(authToken, jwtSecret) as JwtPayload;
    req.userId = decoded.id;
    console.log(req.userId);
    next();
  } catch (err) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      error: ERROR_CODES.UNAUTHORIZED,
    });
    return;
  }
};
