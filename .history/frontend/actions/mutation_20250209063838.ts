"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateMedication, DeleteMedication } from "./getMedications"
import axios from "axios"

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

export const UseDeleteMedication = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id:string | undefined) => DeleteMedication(id),
        onSettled: async (_,error) => {
            if(error){
                throw new Error(error.message)
            }

            await queryClient.invalidateQueries({queryKey:["medications"]})
        },
        onError:(error) => {
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
        }
    })
}

