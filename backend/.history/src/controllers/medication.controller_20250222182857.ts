import { NextFunction, Response, Request } from "express";
import { medicationSchemaInterface } from "../schemas/medication.schema";
import { getSpecficMedication } from "../services/medication.serice";
export const createMedicationHandler = async (
  req: Request<{}, {}, medicationSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
    try {
        const name = req.body.name

        const strength  = req.body.strength
        const existedMedication = await getSpecficMedication({name,strength})


        if(existedMedication){
            existedMedication.st
        }
        
    } catch (error) {
        
    }
};
