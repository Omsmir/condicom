import { z } from "zod";
import { characters, firstNumber, FiveNumber } from "../utils/constants";




export const payload = {
    body:z.object({
        numbers:z.enum(firstNumber,{message:"numbers field is required"}),
        fiveNumbers:z.enum(FiveNumber,{message:"fivenumbers field is required"}),
        characters:z.enum(characters,{message:"characters field is required"}),
        expiration:z.string({message:"expiration plan is required"})
    })
}

export const querys = {
    query:z.object({
        limit:z.coerce.number({message:"limit is required"})
    })
}
export const params = {
    params:z.object({
        id:z.string({message:"id is required"})
    })
}


export const codeSchema = z.object({
    ...payload,
    ...params
})

export const GetCodeSchema = z.object({
    ...params,
    ...querys
})
export type codeSchemaInterface = z.infer<typeof codeSchema>
export type GetcodeSchemaInterface = z.infer<typeof codeSchema>