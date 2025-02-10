import express from "express"
import multer from "multer"
import { CreateAppointment, deleteAppointment, editAppointment, getAppointment, getuserAppointments } from "../controllers/appointmentController.js"
const router = express.Router()

const storage = multer()

router.get("/")
router.post("/",storage.none(),CreateAppointment)

router.get("/",getAppointment)

router.get("/:userId",getuserAppointments)
router.delete("/:id",deleteAppointment)

router.put("/:id",storage.none(),editAppointment)
export default router