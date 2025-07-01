import axios from "axios";
import { BASE_URL } from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = BASE_URL;

export const getTodaysSchedule = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("NO Token");
    const response = await axios.get(`${API_BASE_URL}/student/today/schedule`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.schedules;
  } catch (error: any) {
    console.log("Error fetching todays Schedules: ", error);
  }
};
