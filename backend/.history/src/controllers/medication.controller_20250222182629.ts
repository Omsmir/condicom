import { NextFunction, Response, Request } from "express";
import { medicationSchemaInterface } from "../schemas/medication.schema";
export const createMedicationHandler = async (
  req: Request<{}, {}, medicationSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
    try {
        const name = req.body.name

        const existedMedication = await getSpecficMedication({name:name})


        if(name){
            res.status()
        }
        
    } catch (error) {
        
    }
};
