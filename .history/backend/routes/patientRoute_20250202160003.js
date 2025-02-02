import express from "express"
import multer from "multer"
import { createPatient, DeletePatient, GetPatients } from "../controllers/patientController.js"
const router = express.Router()

const storage = multer()

const upload = multer({ storage: multer.memoryStorage() });

router.post("/create",upload.single("profileImg"),createPatient)

router.get("/",GetPatients)

router.get("")

router.delete("/:id",DeletePatient)

export default router