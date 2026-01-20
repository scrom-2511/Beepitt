import axios from "axios";

export type UpdateIncidentPriorityEnum =
  | "Low"
  | "Critical"
  | "High"
  | "Closed"
  | "Fixed";

export interface UpdateIncidentPriorityBody {
  newPriority: UpdateIncidentPriorityEnum;
}

export const updateIncidentPriorityHandler = async (
  data: UpdateIncidentPriorityBody,
): Promise<void> => {
  try {
    const res = await axios.post(
      "http://localhost:3000/user/updateIncidentPriority",
      data,
      { withCredentials: true },
    );

    if (res.data.success) {
      return;
    }

    throw new Error(res.data.error?.message || "Failed to fetch incidents");
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.error?.message || err.message);
    }
    throw new Error("There was an unknown error, please try again.");
  }
};
