import { NextFunction, Response, Request } from "express";

export const createPatientHandler = async ( req: Request<{}, {}, AppointmentSchemaInterface["body"]>,
    res: Response,)