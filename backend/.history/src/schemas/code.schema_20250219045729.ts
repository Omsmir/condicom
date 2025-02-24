import { file_v1 } from "googleapis";
import { z } from "zod";




export const codeSchema = z.object({
    body:z.object({
        numbers:z.array(z.number(),{message:"numbers field is required"}),
        fiveNumbers:z.array(z.number(),{message:"fivenumbers field is required"}),
        characters:
    })
})