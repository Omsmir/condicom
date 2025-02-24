import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { codeSchema } from '../schemas/code.schema'
import { createCodeHandler } from '../controllers/code.controller'
import { medicationSchema } from '../schemas/medication.schema'


const router = express.Router()


router.post("/create",upload.none(),validate(medicationSchema),createCodeHandler)


export default router