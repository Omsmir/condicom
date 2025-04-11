import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { AddAdditionalSchema, ChangePasswordSchema, CreateUserSchema, UpdateUserSchema } from '../schemas/user.schema'
import { AddAdditionlHandler, changePasswordHandler, ChangeUserInformationHandler, createUserHandler, getAllUsersHandler, getUser } from '../controllers/user.controller'
import { SessionSchema } from '../schemas/session.schema'
import { getUserSessions, login } from '../controllers/session.controller'
import { requireUser } from '../middleware/requireUser'


const router = express.Router()
router.put("/:id",upload.single("profileImg"),validate(AddAdditionalSchema),AddAdditionlHandler)


router.post('/register',upload.none(),validate(CreateUserSchema),createUserHandler)

router.post('/login',upload.none(),validate(SessionSchema),login)

router.put("/update/:id",upload.none(),validate(UpdateUserSchema),ChangeUserInformationHandler)
router.get("/sessions",requireUser,getUserSessions)

router.get("/users/:id",getAllUsersHandler)

router.get("/:id",getUser)


router.put("/password/change/:id",upload.none(),validate(ChangePasswordSchema),changePasswordHandler)
export default router