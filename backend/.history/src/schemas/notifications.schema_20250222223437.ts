import z  from "zod";

export const notificationSchema = z.object({
  type: z.string().min(1, "Type is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  assignedBy: z.string().optional(),
  eventId: z.string().default(""),
  assignedTo: z.string().optional(),
});
