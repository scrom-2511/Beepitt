import { Request, Response } from 'express';
import { prisma } from '../../../database/prismaClient';
import { UpdateIncidentPriorityType } from '../../../types/dataTypes';
import { ERROR_CODES, HttpStatus } from '../../../types/errorCodes';

export const updateIncidentPriority = async (req: Request, res: Response) => {
  try {
    const validateData = UpdateIncidentPriorityType.safeParse(req.body);
    if (!validateData.success) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: {
          id: ERROR_CODES.INVALID_INPUT.code,
          code: ERROR_CODES.INVALID_INPUT.code,
          message: ERROR_CODES.INVALID_INPUT.message,
        },
      });
      return;
    }

    const isIncidentClosed = validateData.data.incidentPriority === 'Closed';

    await prisma.incident.update({
      where: { id: validateData.data.incidentId },
      data: {
        incidentPriority: validateData.data.incidentPriority,
        incidentResolveDateAndTime: isIncidentClosed ? new Date() : null,
      },
    });

    res.status(HttpStatus.OK).json({
      success: true,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        id: ERROR_CODES.INTERNAL_SERVER_ERROR.id,
        code: ERROR_CODES.INTERNAL_SERVER_ERROR.code,
        message: ERROR_CODES.INTERNAL_SERVER_ERROR.message,
      },
    });
  }
};
