import axios from "axios";

export interface SigninRequest {
  email: string;
  password: string;
}

export const signinHandler = async (data: SigninRequest): Promise<void> => {
  try {
    const res = await axios.post(
      "https://francisco-unscholarlike-punctually.ngrok-free.dev/user/signin",
      data,
      {withCredentials: true}
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
