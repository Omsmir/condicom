import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'

import { getPatientSchema, patientSchema } from '../schemas/patient.schema'
import { createPatientHandler, getAllPatientsHandler, getPatientHandler } from '../controllers/patients.controller'


const router = express.Router()


router.post("/",upload.single("profileImg"),validate(patientSchema),createPatientHandler)

router.get("/",getAllPatientsHandler)

router.get("/:id",validate(getPatientSchema),getPatientHandler)

export default router