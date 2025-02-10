"use client"
import { useQueries, useQuery } from "@tanstack/react-query"
import { getMedications } from "./Medications"
import { GetUserAppointments } from "./Appointments"
import { GetPatients } from "./Patients"

export const UseMedicationsQuery =  () => {
    return useQuery({
        queryKey:["medications"],
        queryFn:getMedications,
    })
}

export const UseUserAppointments = (id:string | undefined) => {
    return useQuery({
        queryKey:["userAppointments"],
        queryFn: () => GetUserAppointments(id),
        enabled: !!id,
        
    })
}

export const UsePatientQuery = () => {
    return useQuery({
        queryKey:["patients"],
        queryFn:GetPatients()
    })
}