import { NextFunction, Response, Request } from "express";
import { patientSchemaInterface } from "../schemas/patient.schema";
import { uploadImageToFirebase } from "../utils/getPresignedUrl";
import { randomUUID } from "crypto";
import { createPatient, getPatient } from "../services/patient.service";

export const createPatientHandler = async (
  req: Request<{}, {}, patientSchemaInterface["body"]>,
  res: Response
) => {
  try {
    
    const email = req.body.email;

    const existingPatient = await getPatient({ email: email });

    if (existingPatient) {
        res.status(403).json({message:"patient already exist"})
        return
    }
    const image = req.file as Express.Multer.File;

    const profileImg = await uploadImageToFirebase({
      image: image,
      path: "patients",
      userId: randomUUID(),
    });

    const patient = await createPatient({...req.body,profileImg:profileImg})

    res.status(201).json({message:'patient created successfully',patient})
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
