import api from "./AxiosInstance";
import type { dogs } from "../Types/dataTypes";
import axios from "axios";


export const GetBreeds = async () => {
    try {
        const url = `/Dogs/breeds`
        const {data} = await api.get(url)
        return data

    } catch (error) {
         if(axios.isAxiosError(error)){
            throw new Error(error.response?.data.message,{cause:error});
            
         }
    }
}


export const GetBreedsById = async (id:dogs) => {
    try {
        const url = `/Dogs/breeds/${id}`
        const {data} = await api.get(url)
        return data
    } catch (error) {
          if(axios.isAxiosError(error)){
            throw new Error(error.response?.data.message,{cause:error});
            
         }
    }
}


export const GetImages = async (id:dogs) => {
    try {
        const url = `Dogs/breeds/${id}/images`
        const {data} = await api.get(url)
        return data
    } catch (error) {
         if(axios.isAxiosError(error)){
            throw new Error(error.response?.data.message,{cause:error});
            
         }
    }
}

