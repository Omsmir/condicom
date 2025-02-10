"use client"
import { useQueries, useQuery } from "@tanstack/react-query"
import { getMedications } from "./getMedications"
import { GetUserAppointments } from "./Appointments"

export const UseMedicationsQuery =  () => {
    return useQuery({
        queryKey:["medications"],
        queryFn:getMedications,
    })
}

export const UseUserAppointments = (id:string | undefined) => {
    return useQuery({
        queryKey:["userAppointments",id],
        queryFn: () => GetUserAppointments(id),
        enabled: !!id,
        de
    })
}