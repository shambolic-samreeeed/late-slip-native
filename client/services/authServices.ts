import axios from 'axios';
import { BASE_URL } from '@/config/api';

const login = async (email: string, password: string) =>{
    try{
        const response = await axios.post (`${BASE_URL}/student/login`, {
            email, password
        });
        return response.data
    }catch(error:any){
        throw new Error(
            error.response?.data?.message || 'Login failed. Please try again.'
        )
    }
};

export default {login}