
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAppointments,GetAllAppointments,GetMyAppointments } from "../Api/AppointmentApi";
import { DeleteAppointment } from "../Api/AppointmentApi";


export const useMyAppo = () => {
    return useQuery({
        queryKey:['MyAppo'],
        queryFn:GetMyAppointments
    })
}

export const useAllAppo = () => {
    return useQuery({
        queryKey:['AllAppo'],
        queryFn:GetAllAppointments
    })
}


export const useCreateAppo = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn:createAppointments,
    onSuccess: () => {
        client.invalidateQueries({queryKey:['MyAppo']})
    }
  })
}

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["MyAppo"] });
    },
  });
};


