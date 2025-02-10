import { patient, PatientsToQuery, PatientToQuery } from "@/types";
import axios, { isAxiosError } from "axios";

const baseUrl = process.env.NEXT_API;

const axiosInstace = axios.create({ baseURL: "http://localhost:8080/api" });

export const GetPatients = async () => {
  return (await axiosInstace.get<PatientsToQuery>("/patient")).data;
};



export const GetSpecificPatient = async (id: string | undefined) =>{
return (await axiosInstace.get<PatientToQuery>(`/patient/${id}`)).data
}



export const DeletePatient = async (id: string | undefined) => {
  return await axiosInstace.delete(`/patient/${id}`)
}