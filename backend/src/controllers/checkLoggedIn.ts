import { Response } from "express";
import { CustomReq } from "../middlewares/isLoggedIn";
import { ERROR_CODES, HttpStatus } from "../types/errorCodes";

export const checkLoggedIn = (req: CustomReq, res: Response) => {
  if (!req.userId) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      error: {
        code: ERROR_CODES.UNAUTHORIZED.code,
        message: ERROR_CODES.UNAUTHORIZED.message,
      },
    });
  }

  return res.status(HttpStatus.OK).json({
    success: true,
  });
};
