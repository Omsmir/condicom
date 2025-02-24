import { NextFunction, Response, Request } from "express";
import { patientSchemaInterface } from "../schemas/patient.schema";
import { uploadImageToFirebase } from "../utils/getPresignedUrl";
import { randomUUID } from "crypto";

export const createPatientHandler = async (
  req: Request<{}, {}, patientSchemaInterface["body"]>,
  res: Response
) => {
  try {

    const email = req.body.email
    const image = req.file as Express.Multer.File

    const profileImg = await uploadImageToFirebase({image:image,path:'patients',userId:randomUUID()})


  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
