import { file_v1 } from "googleapis";
import { z } from "zod";




export const codeSchema = z.object({
    body:z.object({
        numbers:z.array(z.number()),
        file_v1
    })
})