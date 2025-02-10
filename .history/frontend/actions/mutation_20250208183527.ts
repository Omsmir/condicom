import { medication } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { CreateMedication } from "./getMedications"

export const UseCreateMedication = () => {
    return useMutation({
        mutationFn: (data: medication) => CreateMedication(data),
        onSettled: ()
    })
}