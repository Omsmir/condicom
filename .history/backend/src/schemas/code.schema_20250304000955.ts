import { z } from "zod";
import { firstNumber } from "../utils/constants";




export const codeSchema = z.object({
    body:z.object({
        numbers:z.enum(firstNumber,{message:"numbers field is required"}),
        fiveNumbers:z.enum(,{message:"fivenumbers field is required"}),
        characters:z.string({message:"characters field is required"})
    })
})



export type codeSchemaInterface = z.infer<typeof codeSchema>