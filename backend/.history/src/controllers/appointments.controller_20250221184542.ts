import { NextFunction, Response, Request } from "express";
import { AppointmentSchemaInterface } from "../schemas/appointment.schema";

export const createAppointmentHandler = async (
  req: Request<{}, {}, AppointmentSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
    try {
        const user = res.locals.user._id

        const existing
    } catch (error) {
        
    }
};
