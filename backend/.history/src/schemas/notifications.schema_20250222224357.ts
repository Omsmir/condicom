import z  from "zod";

export const notificationSchema =  {
    body:z.object({
        type: z.string().min(1, "Type is required"),
        title: z.string().min(1, "Title is required"),
        description: z.string({mess}),
        assignedBy: z.string({message:"assigned by is required"}),
        eventId: z.string().optional(),
        user: z.string({message:"user is required"}),
      })
}