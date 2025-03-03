import { user, UserInformation, Users } from "@/types";
import axios from "axios";
import { signIn } from "next-auth/react";

const axiosInstace = axios.create({
  baseURL: "http://localhost:8080/api/auth/",
});

export const getUsers = async () => {
  const response = await axiosInstace.get<Users>("");
  await new Promise((resolve) => setTimeout(resolve, 300));
  return response.data;
};
export const getUserQuery = async (id: string | undefined) => {
  const response = await axiosInstace.get<user>(`${id}`);

  await new Promise((resolve) => setTimeout(resolve, 300));

  return response.data;
};



export const getAllUsers = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/auth");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export type LoginApiProps = {
  email: string | undefined;
  password: string | undefined;
};

export const LoginApi = async ({ email, password }: LoginApiProps) => {
  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (!result || result.error) {
    throw new Error(result?.error || "Authentication failed");
  }

  return result;
};

export const register = async (FormData: FormData) => {
  return (await axiosInstace.post(`register`, FormData)).data;
};

export interface PostRegisterProps {
  formData: FormData;
  id: string | undefined;
}

export interface RegisterResponse {
  message: string;
  existingUser: UserInformation;
}
export const PostRegister = async ({
  formData,
  id,
}: PostRegisterProps): Promise<RegisterResponse> => {
  return (await axiosInstace.put(`${id}`, formData)).data;
};



export const ChangeUserInfo = async (id:string,data:FormData) => {
return await axiosInstace.put(`/update`)
}