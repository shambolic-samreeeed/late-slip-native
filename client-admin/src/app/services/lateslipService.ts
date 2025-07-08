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

export const getLateSlips = async () => {
  const token = await localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/admin/lateslips`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
