import { z } from "zod";




export const AppointmentSchema = z.object({
    body:z.object({
        task:z.string({message:"task is required"}).min(2,"min characters is 2").max(40,'max characters is 40'),
        description:z.string
    })
})



export type AppointmentSchemaInterface = z.infer<typeof AppointmentSchema>



task: { type: String, required: true },
description: { type: String },
startDate: { type: Date, required: true },
endDate: { type: Date, required: true },
interval: { type: String, required: true },
color: { type: String, required: true },