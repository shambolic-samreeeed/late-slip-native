import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/config/api";

const API_BASE_URL = BASE_URL;

//request a lateslip by a student
export const requestLateSlip = async (reason: string) => {
  const token = await AsyncStorage.getItem("token");
  const res = await axios.post(
    `${API_BASE_URL}/student/requestLateSlip`,
    { reason },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

//get lateslips of specific students
export const getMyLateSlips = async () => {
  const token = await AsyncStorage.getItem("token");
  const res = await axios.get(`${API_BASE_URL}/student/studentLateslips`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
