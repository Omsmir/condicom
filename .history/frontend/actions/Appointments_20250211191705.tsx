import { Appointment, Appointments } from "@/types";
import axios from "axios";



const axiosInstance = axios.create({baseURL:"http://localhost:8080/api"})



export const GetUserAppointments = async (id:string | undefined) => {
const response = (await axiosInstance.get<Appointments>(`appointments/${id}`))

await new Promise((resolve) => setTimeout(resolve,500))

return response.data
}



export const DeleteAppointment = async (id:string | undefined) => {
return await axiosInstance.delete(`appointments/${id}`)
}

export const CreateAppointment = async (appointment:FormData) => {
   return (await axiosInstance.post("appointments",appointment)).data
}