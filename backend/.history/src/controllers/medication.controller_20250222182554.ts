import { NextFunction, Response, Request } from "express";
import { medicationSchemaInterface } from "../schemas/medication.schema";
export const createMedicationHandler = async (
  req: Request<{}, {}, medicationSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
    try {
        const name = 
        
    } catch (error) {
        
    }
};
