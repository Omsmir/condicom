import { FilterQuery } from 'mongoose';
import {
    PatientModel,
    PatientDocument,
    PatientInput,
    PatientsInput,
} from '../models/patient.model';

class PatientService {
    constructor(private patientModel = PatientModel) {}

    public createPatient = async (input: PatientInput) => {
        return await this.patientModel.create(input);
    };

    public getPatient = async (query: FilterQuery<PatientDocument>) => {
        return await this.patientModel.findOne(query);
    };

    public deletePatient = async (query: FilterQuery<PatientDocument>) => {
        return await this.patientModel.deleteOne(query);
    };

    public getAllPatients = async (query?: FilterQuery<PatientDocument>) => {
        return await this.patientModel.find({ query });
    };

    public CreateMultiplePatients = async (input: PatientsInput) => {
        return await this.patientModel.insertMany(input);
    };

    public deleteMultiplePatients = async (input: string[]) => {
        return await this.patientModel.deleteMany({ _id: { $in: input } });
    };

    public deleteAllPatients = async () => {
        return await this.patientModel.deleteMany({});
    };
}


export default PatientService