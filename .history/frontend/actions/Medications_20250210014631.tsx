import { medication, medications } from "@/types";
import axios from "axios";

const baseUrl = process.env.NEXT_API;

const axiosInstance = axios.create({ baseURL: "http://localhost:8080/api" });

export const getMedications = async () => {
  const response = (await axiosInstance.get<medications>("/medications")).data;

  console.log(response);
  return response;
};

export const CreateMedication = async (medication: FormData) => {
  return await axiosInstance.post("medications/create", medication);
};

export const DeleteMedication = async (id: string | undefined) => {
  return await axiosInstance.delete(`medications/${id}`).;
};
