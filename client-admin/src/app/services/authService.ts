import axios from "axios";
import { BASE_URL } from "../utils/api";

interface LoginPayload {
  email: string;
  password: string;
}
export const login = async (payload: LoginPayload) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`, payload);
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong during login';
    throw new Error(message)
  }
};
