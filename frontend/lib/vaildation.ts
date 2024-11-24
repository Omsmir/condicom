import { z } from "zod";

import * as Yup from "yup";

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
    .oneOf(["Male", "Female", "Other"], "please select a gender"),
  birthDate: Yup.string().test(
    "valid-date",
    "Invalid date",
    (value: any) => !isNaN(Date.parse(value))
  ),
  code: Yup.string().required("Support a code").matches(/B(1|2)[0-5](C|D|E)[0-9]{5}/g,"Code is Invaild"),
});
