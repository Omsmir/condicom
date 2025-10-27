import { FilterQuery } from 'mongoose';
import {
    MedicationDocument,
    MedicationInput,
    MedicationModel,
    MedicationsInput,
} from '../models/medication.model';

class MedicationService {
    constructor(private medicationModel = MedicationModel) {}
    public createMedication = async (input: MedicationInput) => {
        return await this.medicationModel.create(input);
    };

    public getMedications = async (query?: FilterQuery<MedicationDocument>) => {
        return await this.medicationModel.find({ query });
    };

    public getSpecficMedication = async (query?: FilterQuery<MedicationDocument>) => {
        return await this.medicationModel.findOne(query);
    };

    public deleteMedication = async (query?: FilterQuery<MedicationDocument>) => {
        return await this.medicationModel.deleteOne(query);
    };

    public createMultipleMedications = async (input: MedicationsInput) => {
        return await this.medicationModel.insertMany(input);
    };
}

export default MedicationService;
