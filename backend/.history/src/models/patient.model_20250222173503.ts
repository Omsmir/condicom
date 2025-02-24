import mongoose from "mongoose";
import { genders } from "../utils/constants";


interface ProfileImage {
    filename?: string;
    url?: string;
    path?: string;
    uploadedAt?: Date;
}
export interface PatientInput {
    _id:string
    profileImg?: ProfileImage
    firstName: string;
    lastName: string;
    gender: string;
    height?: string;
    weight?: string;
    birthDate: string;
    email: string;
    phone: string;
    bloodType: string;
    country: string;
    emergencyContactPerson?: string;
    emergencyContactRelationship?: string;
    emergencyContactNumber: string;
    residentialAddress?: string;
    insuranceProvider?: string;
    medicalConditions: string;
    allergies: string;
    pastSurgeries?: string;
    familyMedicalHistory?: string;
    currentMedications: string;
    smoking: string;
    smokingFrequency?: string;
    alcohol: string;
    AlcoholFrequency?: string;
  }
  
  export interface PatientDocument extends PatientInput, Document {
    createdAt?: Date;
    updatedAt?: Date;
  }
const patientSchema = new mongoose.Schema<PatientDocument>(
    
  {
     _id:{type:mongoose.,required:true,unique:true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profileImg: {
      filename: { type: String },
      url: { type: String },
      path: { type: String },
      uploadedAt: { type: Date, default: Date.now() },
    },
    gender: { type: String, enum: genders, required: true },
    height: { type: String },
    weight: { type: String },
    birthDate: { type: String, required: true },
    email: { type: String ,required:true},
    phone: { type: String, required: true },
    bloodType: { type: String, required: true },
    country: { type: String, required: true },
    emergencyContactPerson: { type: String },
    emergencyContactRelationship: { type: String },
    emergencyContactNumber: { type: String, required: true },
    residentialAddress: { type: String },
    insuranceProvider: { type: String },
    medicalConditions: { type: String, required: true },
    allergies: { type: String, required: true },
    pastSurgeries: { type: String },
    familyMedicalHistory: { type: String },
    currentMedications: { type: String, required: true },
    smoking: { type: String, required: true },
    smokingFrequency: { type: String },
    alcohol: { type: String, required: true },
    AlcoholFrequency: { type: String },
  },
  {
    timestamps: true,
  }
);

export const PatientModel = mongoose.model("patients", patientSchema);
