import axios from "axios";

interface razorPayRequest {
  id: string;
}

type razorPayResponse =
  | {
      success: true;
      data: {
        orderId: string;
        currency: string;
        amount: string;
        dbOrderId: string;
      };
    }
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

export const razorPayCreateOrderHandler = async (
  data: razorPayRequest,
): Promise<razorPayResponse> => {
  try {
    const res = await axios.post(
      "http://localhost:3000/user/razorPayCreateOrder",
      data,
      {
        withCredentials: true,
      },
    );

    if (res.data.success) {
      return { success: true, data: res.data.data };
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
