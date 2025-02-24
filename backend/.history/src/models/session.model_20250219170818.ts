import mongoose, { Document } from "mongoose";

export interface sessionInput {
  code: string;
  used?: boolean;
  user: userDocument["_id"],
  valid:boolean,
  userAgent:string;
}

export interface sessionDocument extends sessionInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema<CodeDocument>(
  {
    code: { type: String, required: true, unique: true },
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    valid:{type:Boolean,default:true},
    userAgent:{type:String}
  },

  { timestamps: true }
);

export const SessionModel = mongoose.model("Code", sessionSchema);
