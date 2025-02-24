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
            {
                // Case 1: New startDate falls within an existing range
                startDate: { $lt: startDate },
                endDate: { $gt: startDate },
              },
              {
                // Case 2: New endDate falls within an existing range
                startDate: { $lt: endDate },
                endDate: { $gt: endDate },
              },
              {
                // Case 3: The new range entirely overlaps an existing range
                startDate: { $gte: startDate },
                endDate: { $lte: endDate },
              },
        ]})
    } catch (error) {
        
    }
};
