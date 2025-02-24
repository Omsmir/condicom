import z  from "zod";

export const notificationSchema =  {
    body:z.object({
        type: z.string().min(1, "Type is required"),
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        assignedBy: z.string({message:"assigned by is req"}),
        eventId: z.string().optional(),
        user: z.string({message:"user is required"}),
      })
}