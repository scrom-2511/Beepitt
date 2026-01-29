import axios from "axios";

export interface SignupRequest {
  email: string;
  username: string;
  password: string;
}
export const signupHandler = async (data: SignupRequest): Promise<void> => {
  try {
    const res = await axios.post(
      "https://francisco-unscholarlike-punctually.ngrok-free.dev/user/signup",
      data,
      {
        withCredentials: true,
      },
    );

    if (res.data.success) {
      return;
    }
    throw new Error(res.data.error?.message);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.error?.message || err.message);
    }
    throw new Error("There was an unknown error, please try again.");
  }
};
