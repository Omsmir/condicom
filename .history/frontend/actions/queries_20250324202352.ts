"use client";
import { keepPreviousData, useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import { getMedications } from "./Medications";
import { GetUserAppointments } from "./Appointments";
import { GetPatients, GetSpecificPatient } from "./Patients";
import { getUserQuery, getUsers } from "./User";
import { getUserNotifications } from "./Notification";
import { getCodes } from "./Codes";

export const UseGetUsers = (id:string | undefined) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>  getUsers(id),
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
    placeholderData:keepPreviousData
  });
};

export const UseUserAppointments = (id: string | undefined) => {
  return useQuery({
    queryKey: ["userAppointments"],
    queryFn: () => GetUserAppointments(id),
    enabled: !!id,
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


export const useGetCodes =  (id: string | undefined) => {
return  useInfiniteQuery({
  queryKey:["codes"],
  queryFn: (pageParams: 6) => getCodes(id),
  initialPageParam:6,
  getNextPageParam: (lastPage, pages) => lastPage.limit
})
}
// export const useGetUserNotifications = (id: string | undefined) => {
//   return useQuery({
//     queryKey: ["userNotifications", id],
//     queryFn: async () => await getUserNotifications(id),
//     refetchOnWindowFocus:true,
//     refetchInterval:1000,
//     refetchOnReconnect:true,
//     staleTime:0
//   });
// };
