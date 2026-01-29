import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../database/prismaClient';
import { HttpStatus } from '../../types/errorCodes';
import { verifyGoogleToken } from '../../utils/verifyGoogleToken.util';

export const googleAuthController = async (req: Request, res: Response) => {
  const { token } = req.body;

  const googleUser = await verifyGoogleToken(token);

  const authAccount = await prisma.authAccount.findUnique({
    where: {
      provider: 'GOOGLE',
      providerId: googleUser.googleId,
    },
    include: { user: true },
  });

  let user = authAccount?.user;

  if (!user && googleUser.email) {
    user =
      (await prisma.user.findUnique({
        where: { email: googleUser.email },
      })) || undefined;

    if (user) {
      await prisma.authAccount.create({
        data: {
          provider: 'GOOGLE',
          providerId: googleUser.googleId,
          userId: user.id,
        },
      });
    }
  }

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: googleUser.email,
        username: googleUser.name,
        avatar: googleUser.avatar,
        authAccounts: {
          create: {
            provider: 'GOOGLE',
            providerId: googleUser.googleId,
          },
        },
      },
    });
  }

  console.log(user.id);

  const jwtPayload = { id: user.id };
  const jwtSecret = process.env.JWT_SECRET;

  const authToken = jwt.sign(jwtPayload, jwtSecret!, { expiresIn: '30d' });
  console.log(authToken);

  res
    .cookie('authToken', authToken, {
      path: '/',
      httpOnly: true,
    })
    .status(HttpStatus.CREATED)
    .json({ success: true });

  return;
};
