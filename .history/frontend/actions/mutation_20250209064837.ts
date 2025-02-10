import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateMedication, DeleteMedication } from "./getMedications"
import axios from "axios"
import { NotificationInstance } from "antd/es/notification/interface"

export const UseCreateMedication = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: FormData) => await CreateMedication(data),
        onSettled: async (_,error) => {
            if(error){
                throw new Error(error.message)
            }

            await queryClient.invalidateQueries({queryKey:["medications"]})
        }
    })
}

export const UseDeleteMedication = (api:NotificationInstance) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id:string | undefined) => DeleteMedication(id),
       
        onError:async(error) => {
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                  api.error({
                    message: "Network Error",
                    description:
                      "Failed to connect to the server. Please check your internet.",
                  });
                } else {
                  api.error({
                    message: "Validation Error",
                    description:
                      error.response.data?.message || "Some fields are incorrect.",
                  });
                }
              } else {
                api.error({
                  message: "Unexpected Error",
                  description: "Something went wrong. Please try again.",
                });
              }
        },
        onSuccess:async (data) => {
            api.success({
              message: data?.data.message || "Deleted successfully!",
              description: "The item has been successfully removed.",
            });
          },
          onSettled: async (data,error) => {
            if(error){
                throw new Error(error.message)
            }
           
            await queryClient.invalidateQueries({queryKey:["medications"]})
        },
    })
}

