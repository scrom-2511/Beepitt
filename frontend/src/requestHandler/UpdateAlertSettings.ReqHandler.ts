import axios from "axios";

export const updateAlertSettings = async (alertPause:object) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/user/updateAlertSettings",
      alertPause,
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.error("There was a problem updating alert settings:", error);
    throw error;
  }
};
