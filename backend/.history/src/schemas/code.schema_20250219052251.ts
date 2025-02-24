import { file_v1 } from "googleapis";
import { z } from "zod";




export const codeSchema = z.object({
    body:z.object({
        numbers:z.coerce.number({message:"numbers field is required"}),
        fiveNumbers:z.coerce.number({message:"fivenumbers field is required"}),
        characters:z.string({message:"characters field is required"})
    })
})



export type codeSchemaInterface = z.infer<typeof codeSchema>