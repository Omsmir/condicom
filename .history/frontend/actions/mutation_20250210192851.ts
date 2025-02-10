import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMedication, DeleteMedication } from "./Medications";
import axios from "axios";
import { NotificationInstance } from "antd/es/notification/interface";
import Swal from "sweetalert2";
import { CreateAppointment, DeleteAppointment } from "./Appointments";
import { CreatePatient, DeletePatient } from "./Patients";
import HandleAxiosErrors from "@/components/HandleAxiosErrors";
import { DashboardHook } from "@/components/context/Dashboardprovider";
import { useRouter } from "next/navigation";

export const UseCreateMedication = (api:NotificationInstance) => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => await CreateMedication(data),
    onError:(error)=>{
      HandleAxiosErrors({api:api,error:error})

  },
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
    onSettled: async (data, error) => {
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
        HandleAxiosErrors({api:api,error:error})
    },
    onSettled: async (data, error) => {
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
        HandleAxiosErrors({api:api,error:error})

    },
    onSettled: async (data, error) => {
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


export const UseDeletePatient = (api:NotificationInstance) => {
    const queryClient = useQueryClient();

    const router = useRouter()
    return useMutation({
        mutationFn: async (id: string | undefined) => DeletePatient(id),
        onm
        onError:(error) =>{
            HandleAxiosErrors({api:api,error:error})

        },
        onSettled:async(data,error,variables) =>{
            if (error) {
                throw new Error(error.message);
              }
              api.success({
                message: data?.data.message,
                pauseOnHover: false,
              });
        
              
              await queryClient.invalidateQueries({
                queryKey: ["patients"],
              });
              
               await queryClient.invalidateQueries({
                queryKey: ["patient",variables],
              });

        }
        
    })
}


export const UseCreatePatient = (api:NotificationInstance) => {
    const queryClient = useQueryClient();
    const {setIsLoading} = DashboardHook()
    return useMutation({
        mutationFn:async(patient:FormData) => await CreatePatient(patient),
        onMutate:() => {
          setIsLoading(true)
        },
        onError:(error)=>{
            HandleAxiosErrors({api:api,error:error})
    
            setIsLoading(false)
        },
        onSettled: async (data, error) => {
            if (error) {
              throw new Error(error.message);
            }
        
              await queryClient.invalidateQueries({
                queryKey: ["patients"],
              });
            
          },
          onSuccess:() => {
            setIsLoading(false)

          }
      
    })
}