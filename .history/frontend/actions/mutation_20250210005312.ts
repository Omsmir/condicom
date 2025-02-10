import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMedication, DeleteMedication } from "./getMedications";
import axios from "axios";
import { NotificationInstance } from "antd/es/notification/interface";
import Swal from "sweetalert2";
import { CreateAppointment, DeleteAppointment } from "./Appointments";

export const UseCreateMedication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => await CreateMedication(data),
    onSettled: async (_, error) => {
      if (error) {
        throw new Error(error.message);
      }

      await queryClient.invalidateQueries({ queryKey: ["medications"] });
    },
  });
};

export const UseDeleteMedication = (api: NotificationInstance) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | undefined) => DeleteMedication(id),
    onError: async (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data.message || "Something went wrong",
            toast: true,
            position: "top-end",
            timer: 3000,
            showConfirmButton: false,
          });
        }
      }
    },
    onSettled: async (data, error) => {
      if (error) {
        throw new Error(error.message);
      }
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: data?.data.message ,
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });

      await queryClient.invalidateQueries({ queryKey: ["medications"] });
    },
  });
};


export const UseDeleteAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:async(id:string | undefined) => DeleteAppointment(id),
        onSettled:async(data,error,variables)=>{
            if (error) {
                throw new Error(error.message);
              }
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: data?.data.message ,
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
              });
              console.log(variables)

              await queryClient.invalidateQueries({queryKey:["userAppointments"]})
        }
    })
}

export const UseCreateAppointment = () => {
    return useMutation({
        mutationFn: async (appointment:FormData) => CreateAppointment(appointment)
    })
}