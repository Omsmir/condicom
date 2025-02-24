import { z } from "zod";




export const codeSchema = z.object({
    body:z.object({
        email:z.string({message:"email is required"}),
        password:z.string({message:"characters field is required"})
    })
})



export type codeSchemaInterface = z.infer<typeof codeSchema>