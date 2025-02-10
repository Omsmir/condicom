import { medication, medications } from "@/types";
import axios from "axios";

const baseUrl = process.env.NEXT_API;

const axiosInstance = axios.create({ baseURL: "http://localhost:8080/api" });

export const getMedications = async () => {

  const response =  (await axiosInstance.get<medications>("/medications")).data;

  console.
  return response
};


export const getSpecficMedication = async (id: string | undefined) => {
  try {
    const response = await axios.get(`${baseUrl}/medications/${id}`);

    const data = (await response.data.medication) as medication | undefined;

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
