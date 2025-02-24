import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { AppointmentParams, AppointmentSchema, updateAppointmentSchema } from '../schemas/appointment.schema'
import { createAppointmentHandler, deleteAppointmentHandler, getUserAppointments, updateAppointmentHandler } from '../controllers/appointments.controller'


const router = express.Router()


router.post("/",upload.none(),validate(AppointmentSchema),createAppointmentHandler)

router.get("/:id",validate(AppointmentParams),getUserAppointments)

router.delete("/:id",validate(AppointmentParams),deleteAppointmentHandler)


router.put("/:id",validate(updateAppointmentSchema),updateAppointmentHandler)
export default router