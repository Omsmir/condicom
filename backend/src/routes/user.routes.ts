import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { AddAdditionalSchema, ChangeEmailSchema, ChangePasswordSchema, ChangeProfilePictureSchema, CheckOtpSchema, CheckTokenExistanceSchema, CreateUserSchema, ResetPasswordNewSchema, ResetPasswordSchema, SendEmailVerificationSchema, UpdateUserSchema } from '../schemas/user.schema'
import { AddAdditionlHandler, changePasswordHandler, changeProfilePictureHandler, ChangeUserInformationHandler, checkOtpEmailChangeHandler, CheckTokenHandler, createUserHandler, getAllUsersHandler, getUser, reIssueAccessTokenHandler, ResetPasswordHandler, SendChangeEmailHandler, sendEmailVerificationHandler, SendResetEmailHandler, verifyEmailHandler } from '../controllers/user.controller'
import { SessionSchema } from '../schemas/session.schema'
import { getUserSessions, login } from '../controllers/session.controller'
import { requireUser } from '../middleware/requireUser'


const router = express.Router()

router.get("/reIssueAccessToken",reIssueAccessTokenHandler)

router.put("/:id",upload.single("profileImg"),validate(AddAdditionalSchema),AddAdditionlHandler)


router.post('/register',upload.none(),validate(CreateUserSchema),createUserHandler)

router.post('/login',upload.none(),validate(SessionSchema),login)

// change main info
router.put("/update/:id",upload.none(),validate(UpdateUserSchema),ChangeUserInformationHandler)


router.get("/sessions",requireUser,getUserSessions)

router.get("/users/:id",getAllUsersHandler)

router.get("/:id",getUser)

// password routes
router.put("/password/change/:id",upload.none(),validate(ChangePasswordSchema),changePasswordHandler)

router.put("/password/reset/message",upload.none(),validate(ResetPasswordSchema),SendResetEmailHandler)

router.put("/password/reset/:token",upload.none(),validate(ResetPasswordNewSchema),ResetPasswordHandler)

//commen token checker
router.get("/password/reset/:token/:hashname",validate(CheckTokenExistanceSchema),CheckTokenHandler)
// email routes
router.post("/email/change/otp/:id",upload.none(),validate(ChangeEmailSchema),SendChangeEmailHandler)

router.post("/email/change/verify/:id",upload.none(),validate(CheckOtpSchema),checkOtpEmailChangeHandler)
// email verification


router.post("/email/verify/:id",validate(SendEmailVerificationSchema),verifyEmailHandler)

router.post("/email/verify/send/:id",validate(SendEmailVerificationSchema),sendEmailVerificationHandler)

// profile picture 

router.put("/picture/:id",upload.single("profilePicture"),validate(ChangeProfilePictureSchema),changeProfilePictureHandler)

export default router