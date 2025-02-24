import z  from "zod";

export const payload =  {
    body:z.object({
        type: z.string({message:"Type is required"}),
        title: z.string({message: "Title is required"}),
        description: z.string({message:"Description is required"}),
        assignedBy: z.string({message:"assigned by is required"}),
        eventId: z.string().optional(),
        user: z.string({message:"user is required"}),
      })
}



export const 
