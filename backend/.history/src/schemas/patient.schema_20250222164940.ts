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