import mongoose, { Document } from "mongoose";

export interface CodeInput {
  code: string;
  role:string;
  used?: boolean;
}

export interface CodeDocument extends CodeInput, Document {
  createdAt: Date;
  updatedAt: Date;
}


const sessionSchema = new mongoose.Schema<CodeDocument>(
    {
      code: { type: String, required: true, unique: true },
      
        required: true,
      },
      used: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  
  export const SessionModel = mongoose.model("Code", sessionSchema);
  