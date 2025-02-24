import { z } from "zod";




export const codeSchema = z.object({
    body:z.object({
        numbers:z.array
    })
})