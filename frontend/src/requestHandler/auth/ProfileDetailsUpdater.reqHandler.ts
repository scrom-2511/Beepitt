import axios from "axios";

export interface profileDetailsUpdateRequest {
  firstName: string;
  lastName: string;
}

export const profileDetailsUpdateHandler = async (
  data: profileDetailsUpdateRequest,
): Promise<void> => {
  try {
    const res = await axios.post(
      "https://francisco-unscholarlike-punctually.ngrok-free.dev/user/updateProfileDetails",
      data,
      {
        withCredentials: true,
      },
    );
    if (res.data.success) return;

    throw new Error(res.data.error?.message);
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.error?.message || err.message);
    }
    throw new Error("There was an unknown error, please try again.");
  }
};
