import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../database/prismaClient';
import { onErrorFromClientType } from '../types/dataTypes';
import { handleMessageSendingToClient } from '../utils/handleMessageSendingToClient.util';

export const onErrorFromClientController = async (
  req: Request,
  res: Response,
) => {
  const validateData = onErrorFromClientType.safeParse(req.body);

  if (!validateData.success) {
    return;
  }

  const jwtSecretForClient = process.env.JWTSECRETFORCLIENT!;

  let userId;

  try {
    const verifyJwt = jwt.verify(
      validateData.data?.jwtToken,
      jwtSecretForClient,
    ) as JwtPayload;
    if (verifyJwt.userId) {
      userId = verifyJwt.userId;
    }
  } catch (error) {
    return;
  }

  await handleMessageSendingToClient(validateData.data);

  // should use kafka for retries
  const newError = await prisma.errors.create({
    data: {
      errorName: validateData.data.errorName,
      errorDesc: validateData.data.errorDesc,
      userId,
    },
  });
};
