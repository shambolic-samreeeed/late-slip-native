import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/config/api";

const API_BASE_URL = BASE_URL;

export const requestLateSlip = async (reason: string) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.post(
      `${API_BASE_URL}/student/requestLateSlip`,
      { reason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Late Slip Request failed", error);
    throw error.response?.data || { message: "Request failed" };
  }
};
