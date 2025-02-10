"use client"
import { useQuery } from "@tanstack/react-query"
import { getMedications } from "./getMedications"

export const UseMedicationsQuery =  () => {
    return useQuery({
        queryKey:["medications"],
        queryFn:getMedications,
        refetchOnMount:true
    })
}