import express from "express"
import multer from "multer"
import { createMedication } from "../controllers/medicationController"
const router = express.Router()

const storage = multer()


router.post("/create",storage.none(),createMedication)


export default router