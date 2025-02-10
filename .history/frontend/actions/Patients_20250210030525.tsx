import { patient, PatientsToQuery } from "@/types";
import axios, { isAxiosError } from "axios";

const baseUrl = process.env.NEXT_API;

const axiosInstace = axios.create({ baseURL: "http://localhost:8080/api" });

export const GetPatients = async () => {
  return (await axiosInstace.get<PatientsToQuery>("/patient")).data;
};



export const GetSpecificPatient = async (id: string : und) =>{

}

export const getSpecficPatient = async (id: string) => {
  try {
    const response = await axios.get(`${baseUrl}/patient/${id}`);

    const data = (await response.data.patient) as patient | undefined;

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }
    } else if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
