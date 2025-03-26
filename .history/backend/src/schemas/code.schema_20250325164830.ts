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

export const sPayload = {
    body:z.object({
        code: z
    .string({ message: "please write down the code" })
    .refine((code) => code.match(/B(1|2)[0-5](C|D|E)[0-9]{5}/g), {
      message: "invalid code",
    }),
    })
}
export const querys = {
    query:z.object({
        limit:z.coerce.number({message:"limit is required"}).optional(),
        cursor:z.string().optional()
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
export type GetcodeSchemaInterface = z.infer<typeof GetCodeSchema>