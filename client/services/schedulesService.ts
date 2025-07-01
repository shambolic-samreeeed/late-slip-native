import axios from "axios";
import { BASE_URL } from "@/config/api";

const API_BASE_URL = BASE_URL;

export const getTodaysSchedule = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/student/today/schedule`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.log("Error Fetching todays results", error);
    throw new Error(error?.response?.data?.message || "failed to fetch");
  }
};
