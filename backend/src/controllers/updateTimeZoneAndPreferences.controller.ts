import { Response } from "express";
import { prisma } from "../database/prismaClient";
import { CustomReq } from "../middlewares/isLoggedIn";
import { TimeZoneAndPreferencesUpdateType } from "../types/dataTypes";
import { ERROR_CODES, HttpStatus } from "../types/errorCodes";

export const updateTimeZoneAndPreferencesController = async (
  req: CustomReq,
  res: Response,
) => {
  try {
    const validateData = TimeZoneAndPreferencesUpdateType.safeParse(req.body);
    if (!validateData.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: {
          code: ERROR_CODES.INVALID_INPUT.code,
          message: ERROR_CODES.INVALID_INPUT.message,
        },
      });
    }

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: validateData.data,
    });

    return res.status(HttpStatus.OK).json({
      success: true,
    });
  } catch (error) {
    console.error("Error updating user preferences:", error);

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: ERROR_CODES.INTERNAL_SERVER_ERROR.code,
        message: ERROR_CODES.INTERNAL_SERVER_ERROR.message,
      },
    });
  }
};
