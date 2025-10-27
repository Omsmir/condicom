import { PatientsToQuery, patientToCreate, PatientToQuery } from '@/types';
import axios from 'axios';

export interface patientsParams {
    pageSize?: number;
    pageIndex?: number;
    date?: number;
    filters?: {
        columnId: string;
        value: any;
    }[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({ baseURL: `${API_URL}/api/patients` });

export const GetPatients = async ({ pageIndex, pageSize, date,filters }: patientsParams) => {
    const response = await axiosInstance.get<PatientsToQuery>('', {
        params: { pageIndex, pageSize, date },
    });
    await new Promise(resolve => setTimeout(resolve, 300));
  
    return response.data;
};

export const GetSpecificPatient = async (id: string | undefined, email?: string) => {
    const response = await axiosInstance.get<PatientToQuery>(`/${id}`, { params: { email } });
    await new Promise(resolve => setTimeout(resolve, 300));
    return response.data;
};

export const DeletePatient = async (id: string | undefined) => {
    return await axiosInstance.delete(`/${id}`);
};

export const CreatePatient = async (patient: FormData) => {
    return await axiosInstance.post(`/create`, patient);
};

export const CreateMultiplePatients = async (patients: patientToCreate[]) => {
    await new Promise(resolve => setTimeout(resolve, 2500));

    const response = await axiosInstance.post('/create-multi', { patients });
    return response;
};

export const getPatientWithEmail = async (email: string | undefined) => {
    const response = await axiosInstance.get<PatientToQuery>('/email', { params: { email } });
    return response.data;
};

export interface deletePatientsProps {
    idsArray: any[] | undefined;
    id: string | undefined;
    query: string;
}

export const deleteMultiplePatients = async ({ idsArray, id, query }: deletePatientsProps) => {
    return await axiosInstance.delete(`/delete-multi/${id}`, {
        data: { patientsIds: idsArray },
        params: {
            all: query,
        },
    });
};
