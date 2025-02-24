import { AppointmentInput, AppointmentModel } from "../models/appointment.model"

export const createAppointment = async (input:AppointmentInput) => {
    return await AppointmentModel.create(input)
}