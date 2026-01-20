import axios from "axios";

export type IncidentPriority = "Fixed";
export interface Incident {
  id: number;
  incidentName: string;
  incidentDesc: string;
  incidentPriority?: IncidentPriority;
  incidentDateAndTime: Date;
  incidentResolveDateAndTime: Date;
}

export const getClosedIncidentsHandler = async (): Promise<Incident[]> => {
  try {
    const res = await axios.post(
      "http://localhost:3000/user/getClosedIncidents",
      {},
      { withCredentials: true },
    );

    if (res.data.success) {
      return res.data.data as Incident[];
    }

    throw new Error(res.data.error?.message || "Failed to fetch incidents");
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.error?.message || err.message);
    }
    throw new Error("There was an unknown error, please try again.");
  }
};
