import { Request, Response } from "express";
import { ERROR_CODES, HttpStatus } from "../../types/errorCodes";

export const checkLoggedIn = (req: Request, res: Response) => {
  if (!req.userId) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      error: {
        code: ERROR_CODES.UNAUTHORIZED.code,
        message: ERROR_CODES.UNAUTHORIZED.message,
      },
    });
    return;
  }

  res.status(HttpStatus.OK).json({
    success: true,
  });
  return;
};
