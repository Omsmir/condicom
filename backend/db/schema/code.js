import mongoose from "mongoose";

const codeApprovalSchema = new mongoose.Schema({
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
  used:{type:Boolean,default:false}
});


export const codeSchema = mongoose.model("codes", codeApprovalSchema);
