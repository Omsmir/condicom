"use client";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import { getMedications } from "./Medications";
import { GetUserAppointments } from "./Appointments";
import { GetPatients, GetSpecificPatient } from "./Patients";
import { checkToken, getUserQuery, getUsers, verifyEmail } from "./User";
import { getCodes } from "./Codes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getUserNotifications } from "./Notification";

export const UseGetUsers = (id: string | undefined) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(id),
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
    placeholderData: keepPreviousData,
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

export const useGetCodes = (id: string | undefined) => {
  return useInfiniteQuery({
    queryKey: ["codes"],
    queryFn: ({ pageParam }: { pageParam?: string | null }) =>
      getCodes({ id, limit: 4, cursor: pageParam ?? null }),
    initialPageParam: null,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor || null,
  });
};

export const useCheckToken = (
  token: string,
  hashname: string,
  KeyType: "VerTokenPrivateKey" | "MULTI_AUTH_SECRET"
) => {
  return useQuery({
    queryKey: ["token"],
    queryFn: () => checkToken(token, hashname, KeyType),
    retry: 15, // Retry 5 times if it fails
    retryDelay: 1000, // 1 second delay between each retry
  });
};

export const UseGetNotifications = (id: string | undefined) => {
  return useQuery({
    queryKey: ["notifications", id],
    queryFn: () => getUserNotifications(id),
    enabled: !!id,
    retry: 3, // Retry 3 times if it fails
    retryDelay: 1000, // 1 second delay between each retry
  });
};
