import { medications } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({ baseURL: "http://localhost:8080/api` });

export const getMedications = async () => {
  const response = await axiosInstance.get<medications>("/medications");

  await new Promise((resolve) => setTimeout(resolve, 300));
  return response.data;
};

export const CreateMedication = async (medication: FormData) => {
  return await axiosInstance.post("medications/create", medication);
};

export const DeleteMedication = async (id: string | undefined) => {
  return await axiosInstance.delete(`medications/${id}`);
};
