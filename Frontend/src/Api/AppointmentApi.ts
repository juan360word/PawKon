
import api from "./AxiosInstance";
import type { createAppointment } from "../Types/dataTypes";
import axios from "axios";

export const createAppointments = async (FormData:createAppointment) => {
   try {
        const url  = `/Appointments/Create`
        const {data} = await api.post(url,FormData)
        return data
    } catch (error) {
     if(axios.isAxiosError(error)){
            throw new Error(error.response?.data.message,{cause:error});
            
         }
   }
}


export const GetMyAppointments = async () => {
    try {
        const url = `/Appointments/Myappointment`
        const {data} = await api.get(url)
        return data
    } catch (error) {
          if(axios.isAxiosError(error)){
            throw new Error(error.response?.data.message,{cause:error});
         }
    }
}


export const GetAllAppointments = async () => {
    try {
        const url = `/Appointments/Allcitas`
        const {data} = await api.get(url)
        return data
    } catch (error) {
         if(axios.isAxiosError(error)){
            throw new Error(error.response?.data.message,{cause:error});
            
         }
    }
}


export const DeleteAppointment = async (id: string) => {
  try {
    const { data } = await api.delete(`/Appointments/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message, { cause: error });
    }
    throw error;
  }
};



   