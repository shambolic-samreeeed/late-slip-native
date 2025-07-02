import { BASE_URL } from "@/utils/apiConfig";
import axios from "axios";

const API_URL = BASE_URL;

const adminLoginService = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, {
      email,
      password,
    });
    return response.data;
  } catch (err: any) {
    throw err;
  }
};

export default { adminLoginService };
