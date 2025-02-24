import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { AddAdditionalSchema, CreateUserSchema } from '../schemas/user.schema'
import { AddAdditionlHandler, createUserHandler } from '../controllers/user.controller'


const router = express.Router()
router.put("/:id",upload.single("profileImg"),validate(AddAdditionalSchema),AddAdditionlHandler)

router.post('/register',upload.none(),validate(CreateUserSchema),createUserHandler)

router.post('/login',upload.none(),val)
export default router