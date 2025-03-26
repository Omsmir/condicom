import mongoose, { Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface CodeInput {
  user:UserDocument['_id']
  code: string;
  role:string;
  used?: boolean;
}

export interface CodeDocument extends CodeInput, Document {
  createdAt: Date;
  updatedAt: Date;
}


const codeApprovalSchema = new mongoose.Schema<CodeDocument>(
    {
      code: { type: String, required: true, unique: true },
      user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
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
  
  export const CodeModel = mongoose.model("Code", codeApprovalSchema);
  