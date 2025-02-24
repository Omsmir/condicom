import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { codeSchema } from '../schemas/code.schema'
import { createCodeHandler } from '../controllers/code.controller'


const router = express.Router()


router.post("/create",upload.none(),validate(codeSchema),createCodeHandler)


export default router