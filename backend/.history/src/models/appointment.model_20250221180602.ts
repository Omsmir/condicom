import mongoose, { Document } from "mongoose";

export interface AppointmentInput {

}

export interface AppointmentDocument extends AppointmentInput, Document {
  createdAt: Date;
  updatedAt: Date;
}


const AppointmentSchema = new mongoose.Schema<AppointmentDocument>(
    {
     
    },
    { timestamps: true }
  );
  
  export const AppointmentModel = mongoose.model("appointments", AppointmentSchema);
  