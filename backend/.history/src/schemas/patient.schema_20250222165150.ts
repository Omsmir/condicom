import z from "zod";
const validImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];

export const patientSchema = {
    
}

profileImg: z
.custom<File[]>((files) => files && files.length > 0, {
  message: "Please select an image",
})
.refine(
  (files) =>
    files.every((file) => {
      const fileName = file.name.toLowerCase();
      const extension = fileName.split(".").pop();
      return validImageExtensions.includes(extension || "");
    }),
  { message: "Invalid image extension" }
),