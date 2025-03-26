import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { codeSchema, GetCodeSchema } from '../schemas/code.schema'
import { createCodeHandler, getCodesHandler } from '../controllers/code.controller'


const router = express.Router()


router.post("/:id",upload.none(),validate(codeSchema),createCodeHandler)

router.get("/find/:id",validate(GetCodeSchema),getCodesHandler)


router.post("/delete/:id",upload.none(),validate(deletecode))
export default router