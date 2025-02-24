import z from 'zod'



const validImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];


const payload = {
    import z from "zod";

    
   
      body: z.object({
        name: z.string({ required_error: "Name is required" }),
        email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
        password: z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters"),
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
        code: z.string().optional(),
      }),
      file: z.object({
        profileImg: z
          .custom<File[]>((files) => files && files.length > 0, { message: "Please upload a profile image" })
          .refine(
            (files) =>
              files.every((file) => {
                const fileName = file.name.toLowerCase();
                const extension = fileName.split(".").pop();
                return validImageExtensions.includes(extension || "");
              }),
            { message: "Invalid image extension" }
          ),
      }),

    
}