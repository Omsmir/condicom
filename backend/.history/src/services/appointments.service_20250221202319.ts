import { FilterQuery } from "mongoose"
import { AppointmentDocument, AppointmentInput, AppointmentModel } from "../models/appointment.model"

export const createAppointment = async (input:AppointmentInput) => {
    return await AppointmentModel.create(input)
}



export const findUserAppointments = async (query:FilterQuery<AppointmentDocument>) => {
return await AppointmentModel.find(query)
}


export const deleteAppointment = async (query:FilterQuery<AppointmentDocument>) => {
    return await AppointmentModel.
}