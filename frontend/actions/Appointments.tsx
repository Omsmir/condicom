import { Appointments, PatientAppointments } from '@/types';
import axios from 'axios';
import { CancelablePromise } from '@/core/CancelablePromise';
import { request } from '@/core/request';
import { OpenApi } from '@/core/OpenApiConfig';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({ baseURL: `${API_URL}/api` });

export const DeleteAppointment = async (id: string | undefined) => {
    return await axiosInstance.delete(`appointments/${id}`);
};

export const CreateAppointment = async (appointment: FormData, patientState: boolean) => {
    return (await axiosInstance.post('appointments', appointment, { params: { patientState } }))
        .data;
};

export class AppointmentService {
    public static GetUserAppointments = (
        id: string | undefined
    ): CancelablePromise<Appointments> => {
        return request(OpenApi, {
            method: 'GET',
            url: `/api/appointments/{id}`,
            path: {
                id,
            },
        });
    };

    public static GetPatientAppointments = (
        email: string | undefined
    ): CancelablePromise<PatientAppointments> => {
        return request(OpenApi, {
            method: 'GET',
            url: `/api/appointments/email`,
            query: {
                email,
            },
        });
    };

    public static DeleteAppointment = (
        id: string | undefined
    ): CancelablePromise<responseMessage> => {
        return request(OpenApi, {
            method: 'DELETE',
            url: `/api/appointments/{id}`,
            path: {
                id,
            },
        });
    };

    public static CreateAppointment = (
        appointment: FormData,
        patientState: boolean | undefined
    ): CancelablePromise<CreateAppointmentResponseI> => {
        return request(OpenApi, {
            method: 'POST',
            url: `/api/appointments`,
            formData: appointment,
            query: {
                patientState,
            },
        });
    };
    public static UpdateAppointment = (
        id: string | undefined,
        state: AppointmentUpdateI
    ): CancelablePromise<responseMessage> => {
        return request(OpenApi, {
            method: 'PUT',
            url: `/api/appointments/{id}`,
            path: {
                id,
            },
            body: state,
        });
    };
}
