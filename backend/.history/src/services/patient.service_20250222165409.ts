import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import {
  patient,
  AppointmentInput,
  AppointmentModel,
} from 

export const createAppointment = async (input: AppointmentInput) => {
  return await AppointmentModel.create(input);
};

export const findUserAppointments = async (
  query: FilterQuery<patient>
) => {
  return await AppointmentModel.find(query);
};
