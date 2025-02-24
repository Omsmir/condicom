import z from "zod";

const validImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];

const payload = {
  body: z
    .object({
      name: z.string({ required_error: "Name is required" }),
      email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email format"),
      password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters"),
      passwordConfirm: z.string({
        required_error: "confirm password is required",
      }),
      phone: z.string({ required_error: "Phone number is required" }),
      birthDate: z.string({ required_error: "Birthdate is required" }),
      gender: z.string({ required_error: "Gender is required" }),
      role: z.string({ required_error: "Role is required" }),
      profileState: z.boolean().default(false),
      verified: z.boolean().default(false),
      token: z.string().optional(),
      expireToken: z.date().optional(),
      bio: z.string().optional(),
      weight: z.string().optional(),
      height: z.string().optional(),
      address: z.string().optional(),
      occupation: z.string().optional(),
      country: z.string().optional(),
      code: z.string({ required_error: "please support a code" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "passwords must match",
      path: ["passwordConfirm"],
    }),
  file: z.object({
    profileImg: z .custom<Express.Multer.File | undefined>( (file) => {
      if (!file) return false;
      const fileName = file.originalname.toLowerCase();
      const extension = fileName.split(".").pop();
      return validImageExtensions.includes(extension || "");
    },
    { message: "Invalid image extension" })
  }).optional()
     

  }),
};

export const CreateUserSchema = z.object({
  ...payload,
});

export type CreateUserInterface = z.infer<typeof CreateUserSchema>;
