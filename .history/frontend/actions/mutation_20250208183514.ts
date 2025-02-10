import { medication } from "@/types"
import { useMutation } from "@tanstack/react-query"

export const UseCreateMedication = () => {
    return useMutation({
        mutationFn: (data: medication) => 
    })
}