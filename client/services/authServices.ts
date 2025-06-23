import axios from "axios";
import { BASE_URL } from "@/config/api";

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/student/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

const register = async (fullname: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/student/register`, {
      fullname,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export default { login, register };
