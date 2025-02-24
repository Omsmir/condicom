import z from "zod";
import {
  medicationCategories,
  medicationForms,
  medicationRoutes,
  medicationStrengths,
} from "../utils/constants";

 const payload = {
  body: z.object({
    name: z
      .string()
      .max(30, "max characters is 30")
      .refine((value) => value !== "", {
        message: "please write the medication name",
      }),
    generic_name: z
      .string()
      .max(30, "max characters is 30")
      .refine((value) => value !== "", {
        message: "please write the generic name",
      }),
    description: z.string().optional(),
    form: z.enum([...medicationForms], {
      message: "please select a medication form",
    }),
    strength: z.enum([...medicationStrengths], {
      message: "please select a medication strength",
    }),
    route: z.enum([...medicationRoutes], {
      message: "please select a medication route",
    }),
    manufacturer: z.string().optional(),
    supplier: z.string().optional(),
    batch_number: z.string().optional(),
    storage_conditions: z.string().optional(),
    expiryDate: z
      .date({ message: "please select expiry date" })
      .refine((date) => date > new Date(), {
        message: "Date must be in future",
      }),
    drug_category: z.enum([...medicationCategories], {
      message: "please select a medication category",
    }),
    price: z.coerce
      .number({ message: "please write down a price" })
      .min(1, { message: "min price is 1" })
      .max(9999, { message: "max price is 9999" }),
    stock_quantity: z.coerce
      .number({ message: "please write down a stock quantity" })
      .min(1, { message: "min quantity is 1" })
      .max(9999, { message: "max quantity is 9999" }),
  }),
};

export const Params = {
    params:z.object({
        id:z.string({message:"id is required"})
    })
}


export const getmedicationSchema = z.object({
    ...Params
})

export const medicationSchema = z.object({
    ...payload
})




export type medicationSchemaInterface = z.infer<typeof medicationSchema>
export type GetmedicationSchemaInterface = z.infer<typeof getmedicationSchema>
