import { NextFunction, Response, Request } from "express";
import { AppointmentSchemaInterface } from "../schemas/appointment.schema";
import { AppointmentModel } from "../models/appointment.model";
import { findUserAppointments } from "../services/appointments.service";

export const createAppointmentHandler = async (
  req: Request<{}, {}, AppointmentSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
    try {
        const userId = res.locals.user._id

        const reserverDates = await findUserAppointments({user:userId,$or:[
            
        ]})
    } catch (error) {
        
    }
};
