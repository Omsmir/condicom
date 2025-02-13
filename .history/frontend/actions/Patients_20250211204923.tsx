import { patient, PatientsToQuery, PatientToQuery } from "@/types";
import axios, { isAxiosError } from "axios";

const baseUrl = process.env.NEXT_API;

const axiosInstace = axios.create({ baseURL: "http://localhost:8080/api" });

export const GetPatients = async () => {
  const response = await axiosInstace.get<PatientsToQuery>("/patient");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return response.data;
};

export const GetSpecificPatient = async (id: string | undefined) => {
  const response = await axiosInstace.get<PatientToQuery>(`/patient/${id}`);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return response.data;
};

export const DeletePatient = async (id: string | undefined) => {
  return await axiosInstace.delete(`/patient/${id}`);
};

export const CreatePatient = async (patient: FormData) => {
  return await axiosInstace.post(`/patient/create`, patient);
};
