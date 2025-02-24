import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'

import { getmedicationSchema, medicationSchema } from '../schemas/medication.schema'
import { createMedicationHandler, deleteMedicationHandler, getAllMedicationsHandler } from '../controllers/medication.controller'


const router = express.Router()


router.post("/create",upload.none(),validate(medicationSchema),createMedicationHandler)

router.get("/",getAllMedicationsHandler)

router.delete("/:id",validate(getmedicationSchema),deleteMedicationHandler)

export default router