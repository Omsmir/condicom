import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import {
  PatientModel,
  PatientDocument,
  PatientInput,
} from "../models/patient.model";

export const createPatient = async (input: PatientInput) => {
  return await PatientModel.create(input);
};

export const getPatient = async (query: FilterQuery<PatientDocument>) => {
  return await PatientModel.find(query);
};

export const deletePatient = async (query: FilterQuery<PatientDocument>) => {
    return await PatientModel.deleteOne(query)
};


export const getAllPatients = async (query?:FilterQuery<PatientDocument>) =>{
    return await PatientModel.fin
}