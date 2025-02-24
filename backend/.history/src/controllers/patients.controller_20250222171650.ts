import { NextFunction, Response, Request } from "express";
import { GetpatientSchemaInterface, patientSchemaInterface } from "../schemas/patient.schema";
import { uploadImageToFirebase } from "../utils/getPresignedUrl";
import { randomUUID } from "crypto";
import {
  createPatient,
  getAllPatients,
  getPatient,
} from "../services/patient.service";

export const createPatientHandler = async (
  req: Request<{}, {}, patientSchemaInterface["body"]>,
  res: Response
) => {
  try {
    const email = req.body.email;

    const existingPatient = await getPatient({ email: email });

    if (existingPatient) {
      res.status(403).json({ message: "patient already exist" });
      return;
    }
    const image = req.file as Express.Multer.File;

    const profileImg = await uploadImageToFirebase({
      image: image,
      path: "patients",
      userId: randomUUID(),
    });

    const patient = await createPatient({
      ...req.body,
      profileImg: profileImg,
    });

    res.status(201).json({ message: "patient created successfully", patient });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPatientsHandler = async (req: Request, res: Response) => {
  try {
    const Patients = await getAllPatients();

    if (!Patients) {
      res.status(404).json({ message: "no patients" });
      return;
    }


    res.status(200).json({message:"success",Patients})
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};



export const getPatientHandler = async (req: Request<GetpatientSchemaInterface['params']>, res: Response) =>{
    try {
        const id = req.params.id
        const Patient = await getPatient({_id:id})
        
        if(!Patient){
            res.status(404).json({message:"patient doesn't exists"})
            return
        }
            
        res.status(5)
    } catch (error) {
        
    }
}