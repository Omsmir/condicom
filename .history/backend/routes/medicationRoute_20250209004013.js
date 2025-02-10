import express from "express"
import multer from "multer"
import { createMedication, GetAllMedications, GetSpecificMedication } from "../controllers/medicationController.js"
const router = express.Router()

const storage = multer()


router.post("/create",storage.none(),createMedication)

router.get("/",GetAllMedications)

router.get("/:id",GetSpecificMedication)

router.delete("")

export default router