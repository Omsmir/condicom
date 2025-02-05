import { z } from "zod";

import * as Yup from "yup";
import { gender, genders, medicationCategories, medicationForms, medicationRoutes, medicationStrengths } from "./constants";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "product name must be at least 2 characters.",
  }),
  price: z.coerce
    .number()
    .min(1, "minimum pirce is 1$")
    .max(999, "maximum price is 999$"),
  description: z
    .string()
    .min(10, "Please provide more details")
    .max(500, "The details provided is too much"),
  image: z.custom<File[]>((file) => file, {
    message: "please select an image",
  }),
});

export const formSchemaEdit = z.object({
  name: z.string().min(2, {
    message: "product name must be at least 2 characters.",
  }),
  price: z.coerce
    .number()
    .min(1, "minimum pirce is 1$")
    .max(999, "maximum price is 999$"),
  description: z
    .string()
    .min(10, "Please provide more details")
    .max(500, "The details provided is too much"),
  image: z.custom<File[]>().optional(),
});

export const userSchema = z.object({
  email: z
    .string()
    .min(1, "email is required")
    .email({ message: "invaild email address" }),
  password: z.string().min(6, "please enter password"),
});

export const RegisterSchema = Yup.object({
  name: Yup.string().min(2, "username must be at least 2 characters.").required("username is required"),
  email: Yup.string()
    .min(1, "email is required")
    .email("Invalid email address."),
  password: Yup.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: Yup.string()
    .min(1, "Passwords must match.")
    .oneOf([Yup.ref("password"), ""], "Passwords must match."),
  phone: Yup.string().min(10, "Phone number is required.").required("please enter your phone"),
  gender: Yup.string()
    .default("male")
    .oneOf(genders, "please select a gender"),
    birthDate: Yup.string()
    .test(
      "valid-date",
      "Invalid date",
      (value: any) => value && !isNaN(Date.parse(value))
    )
    .test(
      "logical-date",
      "Date must be in the past",
      (value:any) => value && new Date(value).getTime() < Date.now()
    )
    .required("BirthDate is required"),

  code: Yup.string().required("Support a code").matches(/B(1|2)[0-5](C|D|E)[0-9]{5}/g,"Code is Invaild"),
});

const validImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];

export const PostRegisterSchema = z.object({
  profileImg: z.custom<File[]>((files) => {
   return files && files.length > 0
    
  }, {
    message: "Please select an Image",
  }).refine((files) =>{
    if (!Array.isArray(files) || files.length === 0) {
      return false;
    }
    return files.every((file) => {
      const fileName = file.name.toLowerCase();
      const extension = fileName.split(".").pop();
      return validImageExtensions.includes(extension || "");
    });
  },{message: "please select a valid image "}),
  weight: z.string({message: "Please Select Weight"}),
  height: z.string({message: "Please Select Height"}),
  address: z.string().optional(),
  bio:z.string().min(30,"Bio Must Exceed 30 characters").max(350,"Bio Can't Be More Than 350 characters").optional(),
  occupation: z.string({message: "Please Select Occupation"}),
  country: z.object({label: z.string({message: "Please Select"})},{message: "Please Select a Country"})

})

export const AppointmentSchema = z.object({
  Task:z.string({message:"Please Provide a Task"}).min(2,"min characters is 2").max(40,"max length is 20 characters"),
  description:z.string().max(80,"max length is 80 characters").optional(),
  startDate: z.date({ message: "please support a start date" }), // Validates ISO 8601 datetime
  endDate: z.date({ message: "please support an end time" }),
  color: z.custom()
  
})

export const patientSchema = z.object({
  firstName: z.string({ message: "First name is required" }).min(2, { message: "Minimum characters is 2" }),
  lastName: z.string({ message: "Last name is required" }).min(2, { message: "Minimum characters is 2" }),
  birthDate: z.date({ message: "Please select a date" }).refine((date) => date < new Date(), { message: "Date must be in past" }),
  profileImg: z
    .custom<File[]>((files) => files && files.length > 0, { message: "Please select an image" })
    .refine(
      (files) =>
        files.every((file) => {
          const fileName = file.name.toLowerCase();
          const extension = fileName.split(".").pop();
          return validImageExtensions.includes(extension || "");
        }),
      { message: "Invalid image extension" }
    ),
  phone: z.string({ message: "Phone number is required" }).refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  weight: z.string().optional(),
  height: z.string().optional(),
  email: z.string().optional(),
  gender:z.string({message:"please select a gender"}),
  bloodType:z.string({message:"please select a blood type"}),
  country: z.object({ label: z.string({ message: "Please select a country" }) }, { message: "Please select a country" }),
  emergencyContactPerson: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
  emergencyContactNumber:  z.string({ message: "emergency number is required" }).refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  residentialAddress: z.string().optional(),
  insuranceProvider: z.string().optional(),
  medicalConditions: z.string({message:"please select a medical condition"}),
  allergies: z.string({message:"please select an allergy"}),
  pastSurgeries: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  currentMedications: z.string({message:"please describe your medications"}),
  smoking: z.enum(["yes", "no"], {
    required_error: "Please select if you smoke",
  }),
  smokingFrequency: z.enum(["daily", "occasionally", "rarely", "never"]).optional(),
  alcohol: z.enum(["yes", "no"], {
    required_error: "Please select if you consume alcohol",
  }),
  alcoholFrequency: z.enum(["daily", "occasionally", "rarely", "never"]).optional(),
});




export const MedicationSchema = z.object({
  name:z.string().max(30,"max characters is 30").refine((value) => value !== "",{message:"please write the medication name"}),
  generic_name:z.string().max(30,"max characters is 30").refine((value) => value !== "",{message:"please write the generic name"}),
  description:z.string().optional(),
  form:z.enum([...medicationForms],{message:"please select a medication form"}),
  strength:z.enum([...medicationStrengths],{message:"please select a medication strength"}),
  route:z.enum([...medicationRoutes],{message:"please select a medication route"}),
  manufacturer:z.string().optional(),
  supplier:z.string().optional(),
  batch_number: z.string().optional(),
  storage_conditions: z.string().optional(),
  expiryDate:z.date({message:"please select expiry date"}).refine((date) => date > new Date() ,{message: "Date must be in future"}),
  drug_category:z.enum([...medicationCategories],{message:"please select a medication category"}),
  price:z.coerce.number({message:"please write down a price"}).min(1,{message:"min price is 1"}).max(9999,{message:"max price is 9999"}),
  stock_Quantity:z.number({message:"please write down a stock quantity"}).min(1,{message:"min quantity is 1"}).max(9999,{message:"max quantity is 9999"})
})


export const PharmacyCsvSchema = z.object({
  
})