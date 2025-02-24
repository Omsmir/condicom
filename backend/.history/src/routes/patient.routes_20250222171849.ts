import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'

import { patientSchema } from '../schemas/patient.schema'
import { createPatientHandler } from '../controllers/patients.controller'


const router = express.Router()


router.post("/",upload.single("profileImg"),validate(patientSchema),createPatientHandler)


export default router