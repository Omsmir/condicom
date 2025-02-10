import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMedication, DeleteMedication } from "./Medications";
import axios from "axios";
import { NotificationInstance } from "antd/es/notification/interface";
import Swal from "sweetalert2";
import { CreateAppointment, DeleteAppointment } from "./Appointments";
import { DeletePatient } from "./Patients";
import HandleAxiosErrors from "@/components/HandleAxiosErrors";

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
    onError:  (error) => {
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
    onSettled: async (data, error,variables) => {
      if (error) {
        throw new Error(error.message);
      }
      api.success({
        message: data?.data.message || "or",
        showProgress: true,
        pauseOnHover: false,
      });
      await queryClient.invalidateQueries({ queryKey: ["medications"] });
    },
  });
};

export const UseDeleteAppointment = (api:NotificationInstance) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | undefined) => DeleteAppointment(id),
    onError:(error)=>{
        HandleAxiosErrors({api:ap})
    },
    onSettled: async (data, error, variables) => {
      if (error) {
        throw new Error(error.message);
      }
      api.success({
        message: data?.data.message,
        pauseOnHover: false,
      });

      await queryClient.invalidateQueries({
        queryKey: ["userAppointments"],
      });
    },
  });
};

export const UseCreateAppointment = (api:NotificationInstance) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointment: FormData) => CreateAppointment(appointment),
    onError:(error)=>{
        if (axios.isAxiosError(error)) {
            if (error.response) {
              api.error({
                message: `${error.response.data.message}`,
                description: "something went wrong",
                showProgress: true,
                pauseOnHover: false,
              });
            } else {
              api.error({
                message: "No Response from Server",
                description:
                  "Please check your network connection or try again later.",
                showProgress: true,
                pauseOnHover: false,
              });
            }
          } else if (error instanceof Error) {
            api.error({
              message: "Unexpected Error",
              description: error.message,
              showProgress: true,
              pauseOnHover: false,
            });
          }
    },
    onSettled: async (data, error, variables) => {
      if (error) {
        throw new Error(error.message);
      }
      api.success({
        message: "Appointment Created Successfully",
        description: "Your appointment has been successfully created",
        showProgress: true,
        pauseOnHover: false,
      });
  
        await queryClient.invalidateQueries({
          queryKey: ["userAppointments"],
        });
      
    },

  });
};


export const UseDeletePatient = (id: string | undefined) => {
    return useMutation({
        mutationFn: async () => DeletePatient(id),
        onSettled:(data,error,variables) =>{

        }
    })
}