import { FilterQuery } from "mongoose";
import { MedicationDocument, MedicationInput, MedicationModel } from "../models/medication.model";

export const createMedication = async (input:MedicationInput) => {
return await MedicationModel.create(input)
}


export const getMedications = async (query?:FilterQuery<MedicationDocument>) => {

}