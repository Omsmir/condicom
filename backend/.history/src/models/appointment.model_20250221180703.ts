import mongoose, { Document, Schema } from "mongoose";

export interface AppointmentInput {
  user: mongoose.Schema.Types.ObjectId;
  task: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  interval: string;
  color: string;
  completed?: boolean;
}

export interface AppointmentDocument extends AppointmentInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<AppointmentDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    interval: { type: String, required: true },
    color: { type: String, required: true },
    completed: { type: Boolean, default: false }, // Default to false if not provided
  },
  { timestamps: true }
);

export const AppointmentModel = mongoose.model<AppointmentDocument>(
  "Appointment",
  AppointmentSchema
);
