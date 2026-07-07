
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAppointments,GetAllAppointments,GetMyAppointments } from "../Api/AppointmentApi";
import { DeleteAppointment } from "../Api/AppointmentApi";
import { UpdateAppointmentStatus } from "../Api/AppointmentApi";

export const useMyAppo = () => {
    return useQuery({
        queryKey:['MyAppo'],
        queryFn:GetMyAppointments
    })
}

export const useAllAppo = () => {
    return useQuery({
        queryKey:['AllAppo'],
        queryFn:GetAllAppointments,
        refetchInterval: 10000
    })
}


export const useCreateAppo = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn:createAppointments,
    onSuccess: () => {
        client.invalidateQueries({queryKey:['MyAppo']})
        client.invalidateQueries({queryKey:['AllAppo']})
    }
  })
}

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["MyAppo"] });
      queryClient.invalidateQueries({ queryKey: ["AllAppo"] });
    },
  });
};

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      UpdateAppointmentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AllAppo"] });
    },
  });
};

