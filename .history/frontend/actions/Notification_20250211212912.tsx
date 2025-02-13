"use server"
import { Notification } from "@/types";
import axios from "axios";

const baseURL = process.env.NEXT_API
const axiosInstace = axios.create({baseURL:`${baseURL}/`})
export const getUserNotification= async (id:string | undefined) => {
    return (await axiosInstace.get<Notification[]>(`notfications/${id}`)).data
}