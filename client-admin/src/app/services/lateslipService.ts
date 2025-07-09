import axios from "axios";
import { BASE_URL } from "../utils/api";
const API_URL = BASE_URL;

export interface LateSlip {
  id: string;
  student_id: string;
  reason: string;
  status: string;
  created_at: string;
  updated_at: string;
  request_id: string;
}

export interface ApproveLateSlipResponse {
  success: boolean;
  lateSlip: LateSlip;
  message: string;
}

export const getLateSlips = async () => {
  const token = await localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/admin/lateslips`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const approveLateSlip = async (
  LateSlipID: string,
  StudentID: string
): Promise<ApproveLateSlipResponse> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  console.log("Sending PUT for:", { LateSlipID, StudentID });

  const response = await axios.put(
    `${BASE_URL}/admin/lateslips/approve/`,
    {
      LateSlipID,
      StudentID,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("Approve response:", response.data);

  return response.data;
};
