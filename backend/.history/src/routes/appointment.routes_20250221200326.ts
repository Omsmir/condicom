import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { createCodeHandler } from '../controllers/code.controller'


const router = express.Router()


router.post("/",upload.none(),validate(appoin),createCodeHandler)


export default router