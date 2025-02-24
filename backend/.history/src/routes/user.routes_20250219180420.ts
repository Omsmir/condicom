import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { AddAdditionalSchema } from '../schemas/user.schema'
import { AddAdditionlHandler } from '../controllers/user.controller'


const router = express.Router()
router.put("/api/auth/:id",upload.single("profileImg"),validate(AddAdditionalSchema),AddAdditionlHandler)


export default router