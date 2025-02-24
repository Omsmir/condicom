import mongoose, { Document, Schema, Model } from "mongoose";

// Notification Input Interface (User-provided data)
export interface NotificationInput {
  type: string;
  title: string;
  description: string;
  user: mongoose.Types.ObjectId;
  assignedBy?: string;
  eventId?: string;
  assignedTo?: string;
  seen?: boolean;
}

// Notification Document Interface (Extends Input & Mongoose Document)
export interface NotificationDocument extends NotificationInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const notificationSchema = new Schema<NotificationDocument>(
  {
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedBy: { type: String },
    eventId: { type: String, default: "" },
    assignedTo: { type: String },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Mongoose Model
export const NotificationModel = mongoose.model<NotificationDocument>("Notification", notificationSchema);
