import { medication } from "@/types";
import axios from "axios";

const baseUrl = process.env.NEXT_API;

console.log(baseUrl);
const axiosInstance = axios.create({ baseURL: baseUrl });

export const getMedications = async () => {
  return await axiosInstance.get<medication[]>("/medications");
};
export const getAllMedications = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/medications`);

    const data = await response.data;

    return data;
  } catch (error: any) {
    console.log(error.message);
  }
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
