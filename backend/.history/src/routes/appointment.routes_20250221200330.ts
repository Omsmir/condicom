import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { createCodeHandler } from '../controllers/code.controller'
import { AppointmentSchema } from '../schemas/appointment.schema'


const router = express.Router()


router.post("/",upload.none(),validate(AppointmentSchema),crea)


export default router