import { Request, Response } from 'express';
import { verifyOtp } from '../services/redis/otpManager.redis';
import { OtpValidateType } from '../types/dataTypes';
import { ERROR_CODES, HttpStatus } from '../types/errorCodes';

export const otpValidateController = async (req: Request, res: Response) => {
  try {
    const validateData = OtpValidateType.safeParse(req.body);
    if (!validateData.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: {
          code: ERROR_CODES.INVALID_INPUT.code,
          message: ERROR_CODES.INVALID_INPUT.message,
        },
      });
    }

    if (!req.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: {
          code: ERROR_CODES.UNAUTHORIZED.code,
          message: ERROR_CODES.UNAUTHORIZED.message,
        },
      });
    }

    const isValid = await verifyOtp(req.userId, validateData.data.otp);

    if (!isValid) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: {
          code: ERROR_CODES.INVALID_OTP.code,
          message: ERROR_CODES.INVALID_OTP.message,
        },
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: ERROR_CODES.INTERNAL_SERVER_ERROR.code,
        message: ERROR_CODES.INTERNAL_SERVER_ERROR.message,
      },
    });
  }
};
