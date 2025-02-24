import { FilterQuery } from "mongoose"
import { AppointmentInput, AppointmentModel } from "../models/appointment.model"

export const createAppointment = async (input:AppointmentInput) => {
    return await AppointmentModel.create(input)
}



export const findUserAppointments = async (query:FilterQuery<AppointmentInput>) => {

}