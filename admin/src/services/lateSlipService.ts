import { BASE_URL } from "@/utils/apiConfig";
import axios from "axios";

const API_URL = BASE_URL;

export const getAllLateSlips = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");

    const response = await axios.get(`${API_URL}/admin/lateslips`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data && response.data.success) {
      return response.data.lateSlips;
    }

    throw new Error("Invalid response");
  } catch (error) {
    console.error("Failed to fetch late slips", error);
    return [];
  }
};
