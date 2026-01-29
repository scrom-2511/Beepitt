import { Request, Response } from 'express';
import { prisma } from '../../database/prismaClient';
import { TimeZoneAndPreferencesUpdateType } from '../../types/dataTypes';
import { ERROR_CODES, HttpStatus } from '../../types/errorCodes';

export const updateTimeZoneAndPreferencesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const validateData = TimeZoneAndPreferencesUpdateType.safeParse(req.body);
    if (!validateData.success) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: {
          code: ERROR_CODES.INVALID_INPUT.code,
          message: ERROR_CODES.INVALID_INPUT.message,
        },
      });
      return;
    }
    console.log('hi there sir');
    console.log(validateData.data);

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: validateData.data,
    });

    res.status(HttpStatus.OK).json({
      success: true,
    });
    return;
  } catch (error) {
    console.error('Error updating user preferences:', error);

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: ERROR_CODES.INTERNAL_SERVER_ERROR.code,
        message: ERROR_CODES.INTERNAL_SERVER_ERROR.message,
      },
    });
    return;
  }
};
