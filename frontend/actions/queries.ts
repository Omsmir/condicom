'use client';
import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getMedications } from './Medications';
import { AppointmentService } from './Appointments';
import { GetPatients, getPatientWithEmail, GetSpecificPatient, patientsParams } from './Patients';
import { checkToken, getUserQuery, getUsers, verifyEmail } from './User';
import { getCodes } from './Codes';

import { getUserNotifications } from './Notification';

export  class Queries {
 
    static UseUserAppointments = (id: string | undefined) => {
        return useQuery({
            queryKey: ['userAppointments', id],
            queryFn: () => AppointmentService.GetUserAppointments(id),
            enabled: !!id,
        });
    };
    static UseGetPatientAppointments = (email: string | undefined) => {
        return useQuery({
            queryKey: ['patientAppointments', email],
            queryFn: () => AppointmentService.GetPatientAppointments(email),
        });
    };
}

export const UseGetUsers = (id: string | undefined) => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers(id),
    });
};

export const useGetUser = (id: string | undefined) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => getUserQuery(id),
    });
};
export const UseMedicationsQuery = () => {
    return useQuery({
        queryKey: ['medications'],
        queryFn: getMedications,
        placeholderData: keepPreviousData,
    });
};


export const UsePatientQuery = ({ pageIndex, pageSize, date, filters }: patientsParams) => {
    return useQuery({
        queryKey: ['patients', pageIndex, pageSize],
        queryFn: async () => GetPatients({ pageIndex, pageSize, date, filters }),
    });
};

export const useSpecificPatient = (id: string | undefined) => {
    return useQuery({
        queryKey: ['patient', id],
        queryFn: async () => GetSpecificPatient(id),
    });
};

export const UseGetPatient = (email: string | undefined) => {
    return useQuery({
        queryKey: ['singlePatient', email],
        queryFn: async () => getPatientWithEmail(email),
    });
};
export const useGetCodes = (id: string | undefined) => {
    return useInfiniteQuery({
        queryKey: ['codes'],
        queryFn: ({ pageParam }: { pageParam?: string | null }) =>
            getCodes({ id, limit: 4, cursor: pageParam ?? null }),
        initialPageParam: null,
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor || null,
    });
};

export const useCheckToken = (
    token: string,
    hashname: string,
    KeyType: 'VerTokenPrivateKey' | 'MULTI_AUTH_SECRET'
) => {
    return useQuery({
        queryKey: ['token'],
        queryFn: () => checkToken(token, hashname, KeyType),
        retry: 15, // Retry 5 times if it fails
        retryDelay: 1000, // 1 second delay between each retry
    });
};

export const UseGetNotifications = (id: string | undefined) => {
    return useQuery({
        queryKey: ['notifications', id],
        queryFn: () => getUserNotifications(id),
        enabled: !!id,
        retry: 3, // Retry 3 times if it fails
        retryDelay: 1000, // 1 second delay between each retry
    });
};
