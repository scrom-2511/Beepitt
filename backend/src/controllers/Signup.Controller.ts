import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../database/prismaClient";
import { locationDetectorProducerSend } from "../services/kafka/producerLocationDetector";
import { SignupType } from "../types/dataTypes";
import { ERROR_CODES, HttpStatus } from "../types/errorCodes";

export const signupController = async (req: Request, res: Response) => {
  try {
    const validateData = SignupType.safeParse(req.body);
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

    if (data) {
      return res.status(HttpStatus.CONFLICT).json({
        success: false,
        error: {
          code: ERROR_CODES.DATA_ALREADY_EXISTS.code,
          message: ERROR_CODES.DATA_ALREADY_EXISTS.message,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(validateData.data.password, 10);

    const identifierKey = uuidv4();

    const newUser = await prisma.user.create({
      data: {
        username: validateData.data.username,
        email: validateData.data.email,
        password: hashedPassword,
        city: "",
        dateAndFormat: "",
        identifierKey,
        subscription_tier: "Free",
      },
    });

    if (req.ip) {
      const emailAndIp = { email: validateData.data.email, ip: req.ip };

      try {
        await locationDetectorProducerSend({
          key: newUser.id.toString(),
          value: JSON.stringify(emailAndIp),
        });
      } catch (err) {
        console.error("Kafka producer error:", err);
      }
    }

    return res.status(HttpStatus.CREATED).json({
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
