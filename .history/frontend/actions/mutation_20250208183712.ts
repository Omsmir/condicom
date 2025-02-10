import { medication } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateMedication } from "./getMedications"

export const UseCreateMedication = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: medication) => CreateMedication(data),
        onSettled: async (_,error) => {
            if(error){
                throw new Error(error.message)
            }

            await
        }
    })
}