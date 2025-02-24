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
        const stock_quantity = req.body.stock_quantity

        const existedMedication = await getSpecficMedication({name,strength})


        if(existedMedication){
          existedMedication.stock_quantity =
            Number(existedMedication.stock_quantity) +
            Number(stock_quantity);


            

            res.status(204).json({message:"medication updated successfully"})
            return
        }
        
    } catch (error) {
        
    }
};
