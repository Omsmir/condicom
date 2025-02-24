import mongoose, { Document } from "mongoose";

export interface CodeInput {
  code: string;
  role:
    | "Admin"
    | "Senior Consultant"
    | "Resident Doctor"
    | "Intern Doctor"
    | "Head Secretary"
    | "Charge Secretary"
    | "Head Nurse"
    | "Charge Nurse";
  used?: boolean;
}

export interface CodeDocument extends CodeInput, Document {
  createdAt: Date;
  updatedAt: Date;
}


