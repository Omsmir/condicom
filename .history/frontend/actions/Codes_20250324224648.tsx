import { code } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: `${API_URL}/api/code`,
});

interface CodeResponse {
  data: {
    message: string;
  };
}

export const generateCode = async (
  formData: FormData,
  id: string | undefined
): Promise<CodeResponse> => {
  const response = await axiosInstance.post(`/${id}`, formData);
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return response;
};



interface CodesProps {
  id:string | undefined
  limit:number 
  cursor?:string | null

}


export interface codeInterface {
  codes:code[];
  nextCursor:string
}
export const getCodes = async ({id,limit,cursor}:CodesProps) => {
  return (await axiosInstance.get<codeInterface>(`/find/${id}`,{params:{limit:2,cursor}})).data;
};
