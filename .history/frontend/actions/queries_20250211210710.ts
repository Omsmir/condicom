"use client";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getMedications } from "./Medications";
import { GetUserAppointments } from "./Appointments";
import { GetPatients, GetSpecificPatient } from "./Patients";
import {  getUserQuery, getUsers } from "./User";

export const UseGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const useGetUser = (id: string | undefined) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserQuery(id),
  });
};
export const UseMedicationsQuery = () => {
  return useQuery({
    queryKey: ["medications"],
    queryFn: getMedications,
  });
};

export const UseUserAppointments = (id: string | undefined) => {
  return useQuery({
    queryKey: ["userAppointments"],
    queryFn: () => GetUserAppointments(id),
    enabled: !!id,
    refetchOnReconnect:false,
    refe
  });
};

export const UsePatientQuery = () => {
  return useQuery({
    queryKey: ["patients"],
    queryFn: GetPatients,
  });
};

export const useSpecificPatient = (id: string | undefined) => {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: async () => GetSpecificPatient(id),
  });
};
