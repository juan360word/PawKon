
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {createAdoptions,GetAllAdoptions,GetMyAdoptions,UpdateAdoptions,GetAdoptedBreeds} from '../Api/AdoptionAPI' 
import type { onlyId, statusAdoptions } from "../Types/dataTypes";


// siempre se hace en este orden cuando piden actualizacion o estados

export const useMyAdoptions = () => {
  return useQuery({
    queryKey: ["myAdoptions"],
    queryFn:GetMyAdoptions ,
  })
}

export const useAllAdoptions = () => {
  return useQuery({
    queryKey: ["allAdoptions"],
    queryFn: GetAllAdoptions,
  })
}

export const useCreateAdoption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdoptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAdoptions"] });
    },
  })
}

export const useUpdateAdoptionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: onlyId; status:statusAdoptions  }) =>
      UpdateAdoptions(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAdoptions"] });
    },
  })
}

export const useAdoptedBreeds = () => {
  return useQuery({
    queryKey: ["adoptedBreeds"],
    queryFn: GetAdoptedBreeds,
  });
};