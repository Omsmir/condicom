import mongoose, { Document } from "mongoose";

export interface AppointmentInput {
  code: string;
  role:string;
  used?: boolean;
}

export interface AppointmentSchema extends AppointmentInput, Document {
  createdAt: Date;
  updatedAt: Date;
}


const AppointmentSchema = new mongoose.Schema<AppointmentSchema>(
    {
      code: { type: String, required: true, unique: true },
      role: {
        type: String,
        enum: [
          "Admin",
          "Senior Consultant",
          "Resident Doctor",
          "Intern Doctor",
          "Head Secretary",
          "Charge Secretary",
          "Head Nurse",
          "Charge Nurse",
        ],
        required: true,
      },
      used: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  
  export const CodeModel = mongoose.model("Code", AppointmentSchema);
  