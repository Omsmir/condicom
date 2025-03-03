import { z } from "zod";
import { characters, firstNumber, FiveNumber } from "../utils/constants";




export const payload = {
    body:z.object({
        numbers:z.enum(firstNumber,{message:"numbers field is required"}),
        fiveNumbers:z.enum(FiveNumber,{message:"fivenumbers field is required"}),
        characters:z.enum(characters,{message:"characters field is required"})
    })
}


export const 


export const codeSchema = z.object({
    ...payload
})


export type codeSchemaInterface = z.infer<typeof codeSchema>