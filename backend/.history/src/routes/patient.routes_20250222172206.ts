import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'

import { deletePatientSchema, getPatientSchema, patientSchema } from '../schemas/patient.schema'
import { createPatientHandler, DeletePatientHandler, getAllPatientsHandler, getPatientHandler } from '../controllers/patients.controller'


const router = express.Router()


router.post("/create",upload.single("profileImg"),validate(patientSchema),createPatientHandler)

router.get("/",getAllPatientsHandler)

router.get("/:id",validate(getPatientSchema),getPatientHandler)

router.delete("/:id",validate(deletePatientSchema),DeletePatientHandler)

export default router