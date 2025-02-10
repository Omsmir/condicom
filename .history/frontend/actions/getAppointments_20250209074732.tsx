import { Appointment } from "@/types";
import axios from "axios";

const baseURI = process.env.lo

export const getAppointments = async () => {
 try {
    const response = await fetch("http://localhost:8080/api/appointments/");

    const data = await response.json();
  
  
    const ArrayOfDates = data.Appointments.map((ele: any) => ({
      ...ele,
      startDate: new Date(ele.startDate),
      endDate: new Date(ele.endDate),
    }));
  
    await new Promise((resolve) => setTimeout(resolve, 500));

    if(ArrayOfDates)

    return ArrayOfDates;
    
 } catch (error) {
    console.log(error);
 }
};



export const getUserAppointments = async (userId:string) => {
   try {
      const response = await axios.get(`http://localhost:8080/api/appointments/${userId}`)
      if(response.status !== 200){
         throw new Error(response.data.message)
      }
      const Appointments = await response.data.userAppointments as Appointment[]

      return Appointments
   } catch (error:any) {
      console.log(error.message)
   }
}