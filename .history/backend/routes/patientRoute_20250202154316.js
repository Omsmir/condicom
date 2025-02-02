import express from "express"
import multer from "multer"
import { createPatient, GetPatients } from "../controllers/patientController"
const router = express.Router()

const storage = multer()


router.post("/",storage.none(),createPatient)

router.get("/",GetPatients)

router.get("/:userId",getuserAppointments)
router.delete("/:id",deleteAppointment)

router.put("/:id",storage.none(),editAppointment)
export default router