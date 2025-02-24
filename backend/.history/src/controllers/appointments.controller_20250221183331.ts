import { NextFunction ,Response,Request} from "express";
import { AppointmentSchemaInterface } from "../schemas/appointment.schema";

export const createAppointmentHandler = async(req:Request<{},{},AppointmentSchemaInterface['bo']>,res:Response,next:NextFunction) => {

}