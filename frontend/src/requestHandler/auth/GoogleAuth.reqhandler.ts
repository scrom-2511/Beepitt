import axios from "axios";

interface GoogleAuthBody {
  token: string;
}

export const googleAuthHandler = async (
  data: GoogleAuthBody,
): Promise<void> => {
  try {
    const res = await axios.post(
      "http://localhost:3000/user/googleAuth",
      data,
      { withCredentials: true },
    );

    if (res.data.success) {
      return;
    }

    throw new Error(
      res.data.error?.message || "Failed to authenticate using google",
    );
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.error?.message || err.message);
    }
    throw new Error("There was an unknown error, please try again.");
  }
};
