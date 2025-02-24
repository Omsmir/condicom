import { z } from "zod";




export const SessionSchema = z.object({
    body:z.object({
        task:z.string({message:"email is required"}),
        password:z.string({message:"password is required"})
    })
})



export type SessionSchemaInterface = z.infer<typeof SessionSchema>



