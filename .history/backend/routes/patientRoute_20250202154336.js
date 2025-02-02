import express from "express"
import multer from "multer"
import { createPatient, DeletePatient, GetPatients } from "../controllers/patientController"
const router = express.Router()

const storage = multer()


router.post("/",storage.none(),createPatient)

router.get("/",GetPatients)

router.delete("/:id",DeletePatient)

export default router