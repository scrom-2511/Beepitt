import axios from "axios";

export interface SigninRequest {
  email: string;
  password: string;
}

type SigninResponse =
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

export const signinHandler = async (
  data: SigninRequest,
): Promise<SigninResponse> => {
  try {
    const res = await axios.post("http://localhost:3000/user/signin", data, {
      withCredentials: true,
    });

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
