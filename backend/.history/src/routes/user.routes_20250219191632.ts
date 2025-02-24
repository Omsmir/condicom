import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { AddAdditionalSchema, CreateUserSchema } from '../schemas/user.schema'
import { AddAdditionlHandler, createUserHandler } from '../controllers/user.controller'
import { SessionSchema } from '../schemas/session.schema'
import { getUserSessions, login } from '../controllers/session.controller'
import { requireUser } from '../middleware/requireUser'


const router = express.Router()
router.put("/:id",upload.single("profileImg"),validate(AddAdditionalSchema),AddAdditionlHandler)

router.post('/register',upload.none(),validate(CreateUserSchema),createUserHandler)

router.post('/login',upload.none(),validate(SessionSchema),login)


router.get("/",requireUser,getUserSessions)


router.get("/:id",req)
export default router