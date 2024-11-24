import mongoose from "mongoose";

const codeApprovalSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
});


export const codeSchema = mongoose.model("codes", codeApprovalSchema);
