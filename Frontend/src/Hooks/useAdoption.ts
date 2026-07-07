
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {createAdoptions,GetAllAdoptions,GetMyAdoptions,UpdateAdoptions,GetAdoptedBreeds} from '../Api/AdoptionAPI' 
import type {  statusAdoptions } from "../Types/dataTypes";
import { DeleteAdoption } from "../Api/AdoptionAPI";

// siempre se hace en este orden cuando piden actualizacion o estados

export const useMyAdoptions = () => {
  return useQuery({
    queryKey: ["myAdoptions"],
    queryFn:GetMyAdoptions ,
     refetchInterval: 10000
  })
}

export const useAllAdoptions = () => {
  return useQuery({
    queryKey: ["allAdoptions"],
    queryFn: GetAllAdoptions,
    refetchInterval: 10000
  })
}

export const useCreateAdoption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdoptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAdoptions"] });
      queryClient.invalidateQueries({ queryKey: ["allAdoptions"] });
    },
  })
}

export const useUpdateAdoptionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, doctorMessage }: { id: string; status: statusAdoptions; doctorMessage?: string }) =>
      UpdateAdoptions(id, status, doctorMessage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAdoptions"] })
      queryClient.invalidateQueries({queryKey:["adoptedBreeds"]})
    },
  })
}

export const useAdoptedBreeds = () => {
  return useQuery({
    queryKey: ["adoptedBreeds"],
    queryFn: GetAdoptedBreeds,
  })
}

// useAdoption.ts
export const useDeleteAdoption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteAdoption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAdoptions"] });
      queryClient.invalidateQueries({ queryKey: ["adoptedBreeds"] });
    },
  })
}