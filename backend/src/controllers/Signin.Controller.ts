import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../database/prismaClient";
import { LoginType } from "../types/dataTypes";
import { ERROR_CODES, HttpStatus } from "../types/errorCodes";

export const SigninController = async (req: Request, res: Response) => {
  try {
    const validateData = LoginType.safeParse(req.body);
    if (!validateData.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: {
          code: ERROR_CODES.INVALID_INPUT.code,
          message: ERROR_CODES.INVALID_INPUT.message,
        },
      });
    }

    const data = await prisma.user.findUnique({
      where: { email: validateData.data.email },
    });

    if (!data) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: {
          code: ERROR_CODES.USER_NOT_FOUND.code,
          message: ERROR_CODES.USER_NOT_FOUND.message,
        },
      });
    }

    const isPasswordValid = await bcrypt.compare(
      validateData.data.password,
      data.password
    );

    if (!isPasswordValid) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: {
          code: ERROR_CODES.INCORRECT_PASSWORD.code,
          message: ERROR_CODES.INCORRECT_PASSWORD.message,
        },
      });
    }

    const jwtPayload = { id: data.id };
    const jwtSecret = process.env.JWT_SECRET;

    const authToken = jwt.sign(jwtPayload, jwtSecret!, { expiresIn: "30d" });

    return res
      .cookie("authToken", authToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(HttpStatus.OK)
      .json({
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: ERROR_CODES.INTERNAL_SERVER_ERROR.code,
        message: ERROR_CODES.INTERNAL_SERVER_ERROR.message,
      },
    });
  }
};
