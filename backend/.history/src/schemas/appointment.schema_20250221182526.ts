import { z } from "zod";




export const SessionSchema = z.object({
    body:z.object({
        task:z.string({message:"task is required"}).min(6,"min characters is 2"),
        password:z.string({message:"password is required"})
    })
})



export type SessionSchemaInterface = z.infer<typeof SessionSchema>



task: { type: String, required: true },
description: { type: String },
startDate: { type: Date, required: true },
endDate: { type: Date, required: true },
interval: { type: String, required: true },
color: { type: String, required: true },