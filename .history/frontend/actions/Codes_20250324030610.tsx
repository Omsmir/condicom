import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


console.log(baseURI);
const axiosInstance = axios.create({
  baseURL: `http://localhost:8080/api/code`,
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
  return  response;
};
