import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'


const router = express.Router()


app.post("/api/code",upload.none(),validate(codeSchema),createCodeHandler)


export default router