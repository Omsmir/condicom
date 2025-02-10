"use client"
import { useQueries, useQuery } from "@tanstack/react-query"
import { getMedications } from "./getMedications"

export const UseMedicationsQuery =  () => {
    return useQuery({
        queryKey:["medications"],
        queryFn:getMedications,
    })
}

export const UseUserAppointments = () => {
    return useQuery
}