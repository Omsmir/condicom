import mongoose, { Document } from "mongoose";

export interface CodeInput {
  code: string;
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
    },
    { timestamps: true }
  );
  
  export const SessionModel = mongoose.model("Code", sessionSchema);
  