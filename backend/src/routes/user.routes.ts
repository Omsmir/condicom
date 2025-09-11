import express, { Router } from 'express';
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
import UserController from '../controllers/user.controller';
import { logOutSchema, SessionSchema } from '../schemas/session.schema';

import { requireUser } from '../middleware/requireUser';
import SessionController from '@/controllers/session.controller';
import { BaseRoute } from './base.route';


class UserRoutes extends BaseRoute {
    constructor(
        private userController: UserController,
        private sessionController: SessionController
    ) {
        super("/auth")
        this.initializeRoutes();
    }

    protected initializeRoutes() {
        this.router.get(
            `${this.path}/reIssueAccessToken`,
            this.userController.reIssueAccessTokenHandler
        );

        this.router.put(
            `${this.path}/:id`,
            upload.single('profileImg'),
            validate(AddAdditionalSchema),
            this.userController.AddAdditionlHandler
        );

        this.router.post(
            `${this.path}/register`,
            upload.none(),
            validate(CreateUserSchema),
            this.userController.createUserHandler
        );

        this.router.post(
            `${this.path}/login`,
            upload.none(),
            validate(SessionSchema),
            this.sessionController.login
        );

        this.router.post(
            `${this.path}/multi-auth-verification/:id`,
            upload.none(),
            validate(CheckOtpSchema),
            this.sessionController.verifyMultiAuthOtpHandler
        );

        this.router.put(
            `${this.path}/logout/:id`,
            validate(logOutSchema),
            this.sessionController.logout
        );
        // change main info
        this.router.put(
            `${this.path}/update/:id`,
            upload.none(),
            validate(UpdateUserSchema),
            this.userController.ChangeUserInformationHandler
        );

        this.router.get(
            `${this.path}/sessions`,
            requireUser,
            this.sessionController.getUserSessions
        );

        this.router.get(`${this.path}/users/:id`, this.userController.getAllUsersHandler);

        this.router.get(`${this.path}/:id`, this.userController.getUser);

        // password and security routes
        this.router.put(
            `${this.path}/password/change/:id`,
            upload.none(),
            validate(ChangePasswordSchema),
            this.userController.changePasswordHandler
        );

        this.router.put(
            `${this.path}/password/reset/message`,
            upload.none(),
            validate(ResetPasswordSchema),
            this.userController.SendResetEmailHandler
        );

        this.router.put(
            `${this.path}/password/reset/:token`,
            upload.none(),
            validate(ResetPasswordNewSchema),
            this.userController.ResetPasswordHandler
        );

        this.router.put(
            `${this.path}/multi-factor-otp/enabling-disabling/:id`,
            validate(SendEmailVerificationSchema),
            this.userController.multiAuthOtpHandler
        );

        this.router.put(
            `${this.path}/multi-factor-otp/enabling/verify/:id`,
            upload.none(),
            validate(CheckOtpSchema),
            this.userController.verifyEnablingMultiAuthOtpHandler
        );

        // common token checker
        this.router.get(
            `${this.path}/token/:token`,
            upload.none(),
            validate(CheckTokenExistanceSchema),
            this.userController.CheckTokenHandler
        );

        // email routes
        this.router.post(
            `${this.path}/email/change/otp/:id`,
            upload.none(),
            validate(ChangeEmailSchema),
            this.userController.SendChangeEmailHandler
        );

        this.router.post(
            `${this.path}/email/change/verify/:id`,
            upload.none(),
            validate(CheckOtpSchema),
            this.userController.checkOtpEmailChangeHandler
        );

        // email verification
        this.router.post(
            `${this.path}/email/verify/:id`,
            validate(SendEmailVerificationSchema),
            this.userController.verifyEmailHandler
        );

        this.router.post(
            `${this.path}/email/verify/send/:id`,
            validate(SendEmailVerificationSchema),
            this.userController.sendEmailVerificationHandler
        );

        // profile
        this.router.put(
            `${this.path}/picture/:id`,
            upload.single('profilePicture'),
            validate(ChangeProfilePictureSchema),
            this.userController.changeProfilePictureHandler
        );

        this.router.delete(`${this.path}`, this.userController.deleteUnVerifiedUsersHandler);
    }
}

export default UserRoutes;
