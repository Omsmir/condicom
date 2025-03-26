import { Notifications } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstace = axios.create({baseURL:`http://localhost:8080/api`})
export const getUserNotifications = async (id:string | undefined) => {
    return (await axiosInstace.get<Notifications >(`notifications/${id}`)).data
}


export const CreateNotification = async (formData:FormData) => {
return await axiosInstace.post("/notifications/create",formData)
}