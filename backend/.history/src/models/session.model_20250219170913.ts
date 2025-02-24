import mongoose, { Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface sessionInput {
  code: string;
  role:string;
  used?: boolean;
  user: UserDocument["_id"],
  valid:boolean,
  userAgent:string;
}

export interface sessionDocument extends sessionInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema<sessionDocument>(
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
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    valid:{type:Boolean,default:true},
    userAgent:{type:String}
  },

  { timestamps: true }
);

export const SessionModel = mongoose.model("Code", sessionSchema);
