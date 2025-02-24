import { NextFunction, Response, Request } from "express";
import { AppointmentSchemaInterface } from "../schemas/appointment.schema";

export const createAppointmentHandler = async (
  req: Request<{}, {}, AppointmentSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
    try {
        const user = res.locals.user

        if(!user) {
            res.status(200)
        }
        
    } catch (error) {
        
    }
};
