import { NextFunction, Response, Request } from "express";
import {
  GetmedicationSchemaInterface,
  medicationSchemaInterface,
} from "../schemas/medication.schema";
import {
  createMedication,
  deleteMedication,
  getMedications,
  getSpecficMedication,
} from "../services/medication.serice";
export const createMedicationHandler = async (
  req: Request<{}, {}, medicationSchemaInterface["body"]>,
  res: Response
) => {
  try {
    const name = req.body.name;

    const strength = req.body.strength;
    const stock_quantity = req.body.stock_quantity;

    const existedMedication = await getSpecficMedication({ name, strength });

    if (existedMedication) {
      existedMedication.stock_quantity =
        Number(existedMedication.stock_quantity) + Number(stock_quantity);

      existedMedication.updateOne({ ...req.body });

      res.status(204).json({ message: "medication updated successfully" });
      return;
    }

    const medication = await createMedication(req.body);

    res
      .status(201)
      .json({ message: "medication created successfully", medication });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMedicationHandler = async (
  req: Request<GetmedicationSchemaInterface["params"]>,
  res: Response
) => {
  try {
    const id = req.params.id;

    const medication = await getSpecficMedication({ _id: id });

    if (!medication) {
      res.status(404).json({ message: "medication doesn't exist" });
      return;
    }

    await deleteMedication({ _id: id });

    res.status(200).json({ message: "medication deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMedicationsHandler = async (req: Request, res: Response) => {
  try {
    const medications = await getMedications();

    if(!medications){
        res.status(404).json({message:"No medications"})
        return
    }
  } catch (error) {}
};
