import z  from "zod";

export const notificationSchema =  {
    body:z.object({
        type: z.string().min(1, "Type is required"),
        title: z.string().min(1,),
        description: z.string({message:"Description is required"}),
        assignedBy: z.string({message:"assigned by is required"}),
        eventId: z.string().optional(),
        user: z.string({message:"user is required"}),
      })
}