import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { AppointmentSchema } from '../schemas/appointment.schema'
import { createAppointmentHandler } from '../controllers/appointments.controller'


const router = express.Router()


router.post("/",upload.none(),validate(AppointmentSchema),createAppointmentHandler)

router.get

export default router