import express from "express"
import multer from "multer"
import { createMedication } from "../controllers/medicationController.js"
const router = express.Router()

const storage = multer()


router.post("/create",storage.none(),createMedication)

router.get("/",getall)

export default router