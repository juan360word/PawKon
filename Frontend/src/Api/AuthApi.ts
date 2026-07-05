

import api from "./AxiosInstance";
import type { RegisterUser,LoginUser } from "../Types/dataTypes";
import axios from "axios";



export const RegisterUsers = async (formData:RegisterUser) => {
    try {
        const url = `/Auth/Register`
        const {data} = await api.post(url,formData)
        return data
    } catch (error) {
         if(axios.isAxiosError(error)){
            throw new Error(error.response?.data.message,{cause:error});
            
         }
        
    }
}

export const LoginUsers = async (FormData:LoginUser) => {
    try {
        const url = `/Auth/Login`
        const {data} = await api.post(url,FormData)
        return data
    } catch (error) {
           if(axios.isAxiosError(error)){
            throw new Error(error.response?.data.message,{cause:error});
            
         }
    }
}