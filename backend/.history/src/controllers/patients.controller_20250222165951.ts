import { NextFunction, Response, Request } from "express";
import { patientSchemaInterface } from "../schemas/patient.schema";
import { uploadImageToFirebase } from "../utils/getPresignedUrl";

export const createPatientHandler = async (
  req: Request<{}, {}, patientSchemaInterface["body"]>,
  res: Response
) => {
  try {
    const image = req.file as Express.Multer.File

    const profileImg = await uploadImageToFirebase({image,path:'patients',})
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
