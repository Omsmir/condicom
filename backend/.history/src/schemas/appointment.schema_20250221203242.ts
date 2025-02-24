import { z } from "zod";




export const AppointmentSchema = z.object({
    body:z.object({
        task:z.string({message:"task is required"}).min(2,"min characters is 2").max(40,'max characters is 40'),
        description:z.string().optional(),
        startDate:z.string({message:"please select a start date"}),
        endDate:z.string({message:"please select an end date"}),
        interval:z.string({message:"please mention the interval"}),
        color:z.string({message:"please select a color"}),
        userId:z.string({message:"userId is required"})
    })
})

export const AppointmentParams = z.object({
    params:z.object({
        id:z.string({message:"id is required"})
    })
})

export const 
export type AppointmentSchemaInterface = z.infer<typeof AppointmentSchema>
export type AppointmentParamInterface = z.infer<typeof AppointmentParams>