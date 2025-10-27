import { medications, medicationToCreate } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({ baseURL: `${API_URL}/api/medications` });

export const getMedications = async () => {
  const response = await axiosInstance.get<medications>("/");

  await new Promise((resolve) => setTimeout(resolve, 300));
  return response.data;
};

export const CreateMedication = async (medication: FormData) => {
  return await axiosInstance.post("/create", medication);
};

export const DeleteMedication = async (id: string | undefined) => {
  return await axiosInstance.delete(`/${id}`);
};


export const CreateMultipleMedications = async (medications: medicationToCreate[]) => {
    await new Promise(resolve => setTimeout(resolve, 2500));

    const response = await axiosInstance.post('/create-multi', { medications });
    return response;
};
