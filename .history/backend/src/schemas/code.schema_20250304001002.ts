import { z } from "zod";
import { firstNumber, FiveNumber } from "../utils/constants";




export const codeSchema = z.object({
    body:z.object({
        numbers:z.enum(firstNumber,{message:"numbers field is required"}),
        fiveNumbers:z.enum(FiveNumber,{message:"fivenumbers field is required"}),
        characters:z.enum({message:"characters field is required"})
    })
})



export type codeSchemaInterface = z.infer<typeof codeSchema>