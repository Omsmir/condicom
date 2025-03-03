import { z } from "zod";
import { characters, firstNumber, FiveNumber } from "../utils/constants";




export const codeSchema = {
    body:z.object({
        numbers:z.enum(firstNumber,{message:"numbers field is required"}),
        fiveNumbers:z.enum(FiveNumber,{message:"fivenumbers field is required"}),
        characters:z.enum(characters,{message:"characters field is required"})
    })
})



export type codeSchemaInterface = z.infer<typeof codeSchema>