import { NextFunction, Response, Request } from "express";
import { AppointmentSchemaInterface } from "../schemas/appointment.schema";
import { AppointmentModel } from "../models/appointment.model";

export const createAppointmentHandler = async (
  req: Request<{}, {}, AppointmentSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
    try {
        const user = res.locals.user._id

        const reserverDates = await 
    } catch (error) {
        
    }
};
