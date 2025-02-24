import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { AddAdditionalSchema } from '../schemas/user.schema'


const router = express.Router()
app.put("/api/auth/:id",upload.single("profileImg"),validate(AddAdditionalSchema),AddAdditionlHandler)


export default router