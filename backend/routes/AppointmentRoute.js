import express from "express"
import multer from "multer"
import { CreateAppointment, deleteAppointment, editAppointment, getAppointment } from "../controllers/appointmentController.js"
const router = express.Router()

const storage = multer()


router.post("/",storage.none(),CreateAppointment)

router.get("/",getAppointment)

router.delete("/:id",deleteAppointment)

router.put("/:id",storage.none(),editAppointment)
export default router