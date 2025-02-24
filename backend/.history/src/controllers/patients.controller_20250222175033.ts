import { NextFunction, Response, Request, ErrorRequestHandler } from "express";
import {
  DeletepatientSchemaInterface,
  GetpatientSchemaInterface,
  patientSchemaInterface,
} from "../schemas/patient.schema";
import { uploadImageToFirebase } from "../utils/getPresignedUrl";
import { randomUUID } from "crypto";
import {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatient,
} from "../services/patient.service";
import { ZodError } from "zod";

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
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      res.status(400).json(error.flatten().);
    }
  }
};

export const getAllPatientsHandler = async (req: Request, res: Response) => {
  try {
    const Patients = await getAllPatients();

    if (!Patients) {
      res.status(404).json({ message: "no patients" });
      return;
    }

    res.status(200).json({ message: "success", Patients });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPatientHandler = async (
  req: Request<GetpatientSchemaInterface["params"]>,
  res: Response
) => {
  try {
    const id = req.params.id;
    const patient = await getPatient({ _id: id });

    if (!patient) {
      res.status(404).json({ message: "patient doesn't exists" });
      return;
    }

    res.status(200).json({ patient });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const DeletePatientHandler = async (
  req: Request<DeletepatientSchemaInterface["params"]>,
  res: Response
) => {
  try {
    const id = req.params.id;
    const Patient = await getPatient({ _id: id });

    if (!Patient) {
      res.status(404).json({ message: "patient doesn't exists" });
      return;
    }

    await deletePatient({ _id: id });
    res.status(200).json({
      message: "patient deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
