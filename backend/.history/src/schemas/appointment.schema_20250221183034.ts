import { z } from "zod";




export const AppointmentSchema = z.object({
    body:z.object({
        task:z.string({message:"task is required"}).min(2,"min characters is 2").max(40,'max characters is 40'),
        description:z.string().optional(),
        startDate:z.date({message:"please select a start date"}),
        endDate:z.date({message:"please select an end date"}),
        interval:z.string({message:"please mention the interval"}),
        color:z.string({message:"please select a color"}),
        userId:
    })
})



export type AppointmentSchemaInterface = z.infer<typeof AppointmentSchema>



interval: { type: String, required: true },
color: { type: String, required: true },