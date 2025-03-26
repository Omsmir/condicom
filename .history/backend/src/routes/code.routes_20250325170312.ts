import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { codeSchema, DeleteCodeSchema, GetCodeSchema } from '../schemas/code.schema'
import { createCodeHandler, deleteCodeHandler, getCodesHandler } from '../controllers/code.controller'


const router = express.Router()


router.post("/:id",upload.none(),validate(codeSchema),createCodeHandler)

router.get("/find/:id",validate(GetCodeSchema),getCodesHandler)


router.post("/delete/:id",upload.none(),validate(DeleteCodeSchema),deleteCodeHandler)
export default router