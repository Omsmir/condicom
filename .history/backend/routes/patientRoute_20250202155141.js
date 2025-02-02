import express from "express"
import multer from "multer"
import { createPatient, DeletePatient, GetPatients } from "../controllers/patientController.js"
const router = express.Router()

const storage = multer({me})


router.post("/create",storage.none(),createPatient)

router.get("/",GetPatients)

router.delete("/:id",DeletePatient)

export default router