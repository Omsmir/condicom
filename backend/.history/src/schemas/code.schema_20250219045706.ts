import { file_v1 } from "googleapis";
import { z } from "zod";




export const codeSchema = z.object({
    body:z.object({
        numbers:z.array(z.number(),{message:"numbers is required"}),
        fiveNumbers:z.array(z.number(),{message:"five numbers is required"})
    })
})