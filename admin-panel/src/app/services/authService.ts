import axios from "axios";
import { BASE_URL } from "../utils/api";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  success: boolean;
  token?: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`, payload);

    const data = response.data;

    if (data.success && data.token) {
      document.cookie = `token=${data.token}; path=/; secure; samesite=strict`;
    }

    return data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};
