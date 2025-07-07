import axios from "axios";
import { BASE_URL } from "../utils/api";

export interface LateSlip {
  id: string;
  student_id: string;
  reason: string;
  status: string;
  created_at: string;
  updated_at: string;
  request_id: string;
}

interface LateSlipsResponse {
  success: boolean;
  lateSlips: LateSlip[];
}

export const getLateSlips = async (): Promise<LateSlipsResponse> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.get(`${BASE_URL}/admin/lateslips/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;

    if (!data.success) {
      throw new Error("Failed to fetch late slips");
    }

    return data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Failed to fetch late slips";
    throw new Error(message);
  }
};
