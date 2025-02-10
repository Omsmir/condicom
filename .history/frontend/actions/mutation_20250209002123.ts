import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateMedication, DeleteMedication } from "./getMedications"

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
        }
    })
}

