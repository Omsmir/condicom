import { NextFunction, Response, Request } from "express";
import { patientSchemaInterface } from "../schemas/patient.schema";

export const createPatientHandler = async ( req: Request<{}, {}, patientSchemaInterface["body"]>,
    res: Response,) => {
        try {
            
        } catch (error) {
            
        }
    }