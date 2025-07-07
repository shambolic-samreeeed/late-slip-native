import axios from "axios";
import { BASE_URL } from "../utils/api";

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`, payload);
    const data = response.data;

    if (data?.data?.role !== "admin") {
      throw new Error("Unauthorized access. Only admins can log in.");
    }

    return data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error.message || "Login failed";
    throw new Error(message);
  }
};
