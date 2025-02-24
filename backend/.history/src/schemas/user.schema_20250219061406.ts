import z from "zod";

const validImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];

const firstPayload = {
  body: z
    .object({
      name: z.string({ required_error: "Name is required" }),
      email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email format"),
      password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string({
        required_error: "confirm password is required",
      }),
      phone: z.string({ required_error: "Phone number is required" }),
      birthDate: z.string({ required_error: "Birthdate is required" }),
      gender: z.string({ required_error: "Gender is required" }),
      
      code: z.string({ required_error: "please support a code" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "passwords must match",
      path: ["confirmPassword"],
    })
 
};

const secondPayload = {
    body:z.object({
        bio: z.string().optional(),
        weight: z.string({message:"please select a weight"}),
        height: z.string({message:"please select a height"}),
        address: z.string().optional(),
        occupation: z.string({message:"please select an occupation"}),
        country: z.string({message:"please select a country"}),
    }),
    file: z.object({
        profileImg: z.custom<Express.Multer.File | undefined>((files) ).refine((file) => {
            if (!file) return false;
            const fileName = file.originalname.toLowerCase();
            const extension = fileName.split(".").pop();
            return validImageExtensions.includes(extension || "");
          },
          { message: "Invalid image extension" })
      })
}
const params = {
    params:z.object({
        id:z.string({message:"id is required"})
    })
}
export const CreateUserSchema = z.object({
  ...firstPayload,
});


export const AddAdditionalSchema = z.object({
...params
})

export type CreateUserInterface = z.infer<typeof CreateUserSchema>;
