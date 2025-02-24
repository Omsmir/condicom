import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { PatientModel,PatientDocument,PatientInput } from "../models/patient.model";


export const createAppointment = async (input: AppointmentInput) => {
  return await AppointmentModel.create(input);
};

export const findUserAppointments = async (
  query: FilterQuery<patient>
) => {
  return await AppointmentModel.find(query);
};
