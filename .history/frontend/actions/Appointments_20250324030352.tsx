import { data } from "@/components/togglers/Handlers";
import { Appointment, Appointments } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const axiosInstance = axios.create({baseURL:`${}/api`})



export const GetUserAppointments = async (id:string | undefined) => {
const response = (await axiosInstance.get<Appointments>(`appointments/${id}`))

await new Promise((resolve) => setTimeout(resolve,300))

return response.data
}



export const DeleteAppointment = async (id:string | undefined) => {
return await axiosInstance.delete(`appointments/${id}`)
}

export const CreateAppointment = async (appointment:FormData) => {
   return (await axiosInstance.post("appointments",appointment)).data
}


export const UpdateAppointment = async (id:string | undefined,state:data) => {
   return await axiosInstance.put(`appointments/${id}`,state)
}