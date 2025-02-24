import mongoose, { Document, Schema, Model } from "mongoose";
import { medicationCategories, medicationForms, medicationRoutes, medicationStrengths } from "../utils/constants";
import { randomUUID } from "crypto";

export interface MedicationInput {
  name: string;
  generic_name: string;
  description?: string;
  form: (typeof medicationForms)[number];
  strength: (typeof medicationStrengths)[number];
  route: (typeof medicationRoutes)[number];
  drug_category: (typeof medicationCategories)[number];
  manufacturer?: string;
  supplier?: string;
  batch_number?: string;
  storage_conditions?: string;
  expiryDate: Date;
  price: number;
  stock_quantity: number;
}

export interface MedicationDocument extends MedicationInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const medicationSchema = new Schema<MedicationDocument>(
  {
    _id:{type:String,default:() => randomUUID()}
    name: { type: String, required: true },
    generic_name: { type: String, required: true },
    description: { type: String },
    form: { type: String, enum: medicationForms, required: true },
    strength: { type: String, enum: medicationStrengths, required: true },
    route: { type: String, enum: medicationRoutes, required: true },
    drug_category: { type: String, enum: medicationCategories, required: true },
    manufacturer: { type: String },
    supplier: { type: String },
    batch_number: { type: String },
    storage_conditions: { type: String },
    expiryDate: { type: Date, required: true },
    price: { type: Number, required: true },
    stock_quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

// Mongoose Model
export const MedicationModle = mongoose.model("Medications", medicationSchema);
