"use client"
import { useQueries, useQuery } from "@tanstack/react-query"
import { getMedications } from "./getMedications"
import { GetUserAppointments } from "./getAppointments"

export const UseMedicationsQuery =  () => {
    return useQuery({
        queryKey:["medications"],
        queryFn:getMedications,
    })
}

export const UseUserAppointments = (id:string | un) => {
    return useQuery({
        queryKey:["userAppointments"],
        queryFn: () => GetUserAppointments(id)
    })
}