import axios from "axios";

export interface otpValidatorRequest {
  otp: string;
}

type otpValidatorResponse =
  | { success: true }
  | {
      success: false;
      data: {
        error: {
          id: number;
          code: string;
          message: string;
        };
      };
    };

export const otpValidatorHandler = async (
  data: otpValidatorRequest,
): Promise<otpValidatorResponse> => {
  try {
    const res = await axios.post(
      "http://localhost:3000/user/otpValidator",
      data,
      {
        withCredentials: true,
      },
    );

    if (res.data.success) {
      return { success: true };
    }

    return {
      success: false,
      data: {
        error: res.data.error,
      },
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const data = err.response?.data;
      if (data && !data.success) {
        return { success: false, data };
      }
    }

    return {
      success: false,
      data: {
        error: {
          id: 0,
          code: "UNKNOWN",
          message: "There was an error, please try again.",
        },
      },
    };
  }
};
