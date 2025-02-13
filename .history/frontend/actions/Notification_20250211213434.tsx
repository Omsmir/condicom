import { Notifications } from "@/types";
import axios from "axios";

const baseURL = process.env.NEXT_API
const axiosInstace = axios.create({baseURL:`http://localhost:8080/api`})
export const getUserNotifications = async (id:string | undefined) => {
    return (await axiosInstace.get<Notifications[] | undefined>(`notifications/${id}`)).data
}