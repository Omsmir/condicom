import mongoose, { Document } from "mongoose";

export interface AppointmentInput {

}

export interface AppointmentDocument extends AppointmentInput, Document {
  createdAt: Date;
  updatedAt: Date;
}


const AppointmentSchema = new mongoose.Schema<AppointmentDocument>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        task: { type: String, requird: true },
        description:{type:String},
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        interval: {type:String,required:true},
        color:{type:String,required:true },
        completed: {type:Boolean}
    },
    { timestamps: true }
  );
  
  export const AppointmentModel = mongoose.model("appointments", AppointmentSchema);
  