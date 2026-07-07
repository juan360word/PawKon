import api from "./AxiosInstance";
import type { createAdoption, Adoption } from "../Types/dataTypes";
import axios from "axios";
import type { statusAdoptions } from "../Types/dataTypes";


export const createAdoptions = async (FormData:createAdoption) => {
    try {
        const url = `/Adoptions/Create`
        const {data} = await api.post(url,FormData)
        return data
    } catch (error) {
         if(axios.isAxiosError(error)){
            throw new Error(error.response?.data.message,{cause:error});
            
         }
        
    }
}


export const GetMyAdoptions =  async (): Promise<Adoption[]> => {
    try {
        const url = `/Adoptions/MyAdoption`
        const {data} = await api.get<Adoption[]>(url)
        return data
    } catch (error) {
         if(axios.isAxiosError(error)){
            throw new Error(error.response?.data.message,{cause:error});

         }
        throw error
    }
}


export const GetAllAdoptions =  async (): Promise<Adoption[]> => {
    try {
        const url = `/Adoptions/Alladopciones`
        const {data} = await api.get<Adoption[]>(url)
        return data
    } catch (error) {
         if(axios.isAxiosError(error)){
            throw new Error(error.response?.data.message,{cause:error});

         }
        throw error
    }
}


export const UpdateAdoptions = async (id: string, status: statusAdoptions, doctorMessage?: string) => {
    try {
        const url = `/Adoptions/${id}/status`
        const {data} = await api.patch(url,{status,doctorMessage})
        return data
    } catch (error) {
         if(axios.isAxiosError(error)){
            throw new Error(error.response?.data.message,{cause:error});
            
         }
    }
}

export const GetAdoptedBreeds = async (): Promise<{ adoptedBreeds: string[] }> => {
  try {
    const { data } = await api.get<{ adoptedBreeds: string[] }>("/Adoptions/AdoptedBreeds");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message, { cause: error });
    }
    throw error;
  }
}


export const DeleteAdoption = async (id: string) => {
  try {
    const { data } = await api.delete(`/Adoptions/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message, { cause: error });
    }
    throw error;
  }
};



