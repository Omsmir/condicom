import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { codeSchema } from '../schemas/code.schema'
import { createCodeHandler } from '../controllers/code.controller'
import { patientSchema } from '../schemas/patient.schema'


const router = express.Router()


router.post("/",upload.single("profileImg"),validate(patientSchema),createpa)


export default router