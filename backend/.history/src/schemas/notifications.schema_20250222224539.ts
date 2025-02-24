import z  from "zod";

 const payload =  {
    body:z.object({
        type: z.string({message:"Type is required"}),
        title: z.string({message: "Title is required"}),
        description: z.string({message:"Description is required"}),
        assignedBy: z.string({message:"assigned by is required"}),
        eventId: z.string().optional(),
        user: z.string({message:"user is required"}),
      })
}

const params = {
    params:z.object({
        
    })
}


export const notificationSchema = z.object({
    ...payload
})


export type notificationSchemaInterface = z.infer<typeof notificationSchema>