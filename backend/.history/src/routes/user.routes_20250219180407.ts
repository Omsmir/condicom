import express from 'express'
import upload from '../middleware/multer'


const router = express.Router()
app.put("/api/auth/:id",upload.single("profileImg"),validate(AddAdditionalSchema),AddAdditionlHandler)


export default router