import express from 'express';
import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';
import {
    AddAdditionalSchema,
    ChangeEmailSchema,
    ChangePasswordSchema,
    ChangeProfilePictureSchema,
    CheckOtpSchema,
    CheckTokenExistanceSchema,
    CreateUserSchema,
    ResetPasswordNewSchema,
    ResetPasswordSchema,
    SendEmailVerificationSchema,
    UpdateUserSchema,
} from '../schemas/user.schema';
import {
    AddAdditionlHandler,
    changePasswordHandler,
    changeProfilePictureHandler,
    ChangeUserInformationHandler,
    checkOtpEmailChangeHandler,
    CheckTokenHandler,
    createUserHandler,
    deleteUnVerifiedUsersHandler,
    getAllUsersHandler,
    getUser,
    multiAuthOtpHandler,
    reIssueAccessTokenHandler,
    ResetPasswordHandler,
    SendChangeEmailHandler,
    sendEmailVerificationHandler,
    SendResetEmailHandler,
    verifyEmailHandler,
    verifyEnablingMultiAuthOtpHandler,
} from '../controllers/user.controller';
import { logOutSchema, SessionSchema } from '../schemas/session.schema';
import {
    getUserSessions,
    login,
    logout,
    verifyMultiAuthOtpHandler,
} from '../controllers/session.controller';
import { requireUser } from '../middleware/requireUser';
import { Routes } from '@/interfaces/routes.interface';

class UserRoutes implements Routes {
    public path = '/auth';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/reIssueAccessToken`, reIssueAccessTokenHandler);

        this.router.put(
            `${this.path}/:id`,
            upload.single('profileImg'),
            validate(AddAdditionalSchema),
            AddAdditionlHandler
        );

        this.router.post(
            `${this.path}/register`,
            upload.none(),
            validate(CreateUserSchema),
            createUserHandler
        );

        this.router.post(`${this.path}/login`, upload.none(), validate(SessionSchema), login);

        this.router.post(
            `${this.path}/multi-auth-verification/:id`,
            upload.none(),
            validate(CheckOtpSchema),
            verifyMultiAuthOtpHandler
        );

        this.router.put(`${this.path}/logout/:id`, validate(logOutSchema), logout);
        // change main info
        this.router.put(
            `${this.path}/update/:id`,
            upload.none(),
            validate(UpdateUserSchema),
            ChangeUserInformationHandler
        );

        this.router.get(`${this.path}/sessions`, requireUser, getUserSessions);

        this.router.get(`${this.path}/users/:id`, getAllUsersHandler);

        this.router.get(`${this.path}/:id`, getUser);

        // password and security routes
        this.router.put(
            `${this.path}/password/change/:id`,
            upload.none(),
            validate(ChangePasswordSchema),
            changePasswordHandler
        );

        this.router.put(
            `${this.path}/password/reset/message`,
            upload.none(),
            validate(ResetPasswordSchema),
            SendResetEmailHandler
        );

        this.router.put(
            `${this.path}/password/reset/:token`,
            upload.none(),
            validate(ResetPasswordNewSchema),
            ResetPasswordHandler
        );

        this.router.put(
            `${this.path}/multi-factor-otp/enabling-disabling/:id`,
            validate(SendEmailVerificationSchema),
            multiAuthOtpHandler
        );

        this.router.put(
            `${this.path}/multi-factor-otp/enabling/verify/:id`,
            upload.none(),
            validate(CheckOtpSchema),
            verifyEnablingMultiAuthOtpHandler
        );

        // common token checker
        this.router.get(
            `${this.path}/token/:token`,
            upload.none(),
            validate(CheckTokenExistanceSchema),
            CheckTokenHandler
        );

        // email routes
        this.router.post(
            `${this.path}/email/change/otp/:id`,
            upload.none(),
            validate(ChangeEmailSchema),
            SendChangeEmailHandler
        );

        this.router.post(
            `${this.path}/email/change/verify/:id`,
            upload.none(),
            validate(CheckOtpSchema),
            checkOtpEmailChangeHandler
        );

        // email verification
        this.router.post(
            `${this.path}/email/verify/:id`,
            validate(SendEmailVerificationSchema),
            verifyEmailHandler
        );

        this.router.post(
            `${this.path}/email/verify/send/:id`,
            validate(SendEmailVerificationSchema),
            sendEmailVerificationHandler
        );

        // profile
        this.router.put(
            `${this.path}/picture/:id`,
            upload.single('profilePicture'),
            validate(ChangeProfilePictureSchema),
            changeProfilePictureHandler
        );

        this.router.delete(`${this.path}`, deleteUnVerifiedUsersHandler);
    }
}

export default UserRoutes;
