import { Request, Response } from 'express';
import {
    AddAdditionalInterface,
    ChangeEmailInterface,
    ChangePasswordInterface,
    ChangeProfilePictureInterface,
    ChangeUserInterface,
    CheckOtpInterface,
    CheckTokenExistanceInterface,
    CreateUserInterface,
    ResetPasswordInterface,
    ResetPasswordNewInterface,
    SendEmailVerificationInterface,
} from '../schemas/user.schema';
import { deleteImage, uploadImageToFirebase } from '../utils/getPresignedUrl';
import UserService from '../services/user.service';
import CodeService from '../services/code.service';

import mongoose from 'mongoose';
import { generateOtp, hashPassword } from '../utils/backevents';
import { addHours, addWeeks } from 'date-fns';
import { signJwt, verifyJwt } from '../utils/jwt.sign';
import { UserDocument } from '../models/user.model';
import { get } from 'lodash';

import NotificationService from '../services/notifications.service';
import {
    ACCESSTOKENTTL,
    DFTOKENTTL,
    FRONTEND_URI_DEV,
    NODE_ENV,
    OTPTTL,
    REFRESHTOKENTTL,
    TEMPORALTOKENTTL,
} from 'config';
import App from '@/app';
import { BaseController } from './base.controller';
import HttpException from '@/exceptions/httpException';
import SessionService from '@/services/session.service';
import { RedisConnection, RedisServices } from '@/utils/redis';
import { EmailSubjects, SendEmail } from '@/utils/emailUtils';

class UserController extends BaseController {
    private FRONTEND_URL: string | undefined;
    private userService: UserService;
    private codeService: CodeService;
    private notificationService: NotificationService;
    private sessionService: SessionService;
    private redisService: RedisServices;
    constructor() {
        super();
        this.FRONTEND_URL = NODE_ENV === 'development' ? FRONTEND_URI_DEV : '';
        this.userService = new UserService();
        this.codeService = new CodeService();
        this.notificationService = new NotificationService();
        this.sessionService = new SessionService();
        this.redisService = new RedisServices(RedisConnection.getInstance().getClient());
    }

    public createUserHandler = async (
        req: Request<{}, {}, CreateUserInterface['body']>,
        res: Response
    ) => {
        try {
            const email = req.body.email;
            const code = req.body.code;

            // Check if the user already exists
            const existingUser = await this.userService.findUser({ email });

            if (existingUser) {
                throw new HttpException(403, 'User already exists');
            }

            // Check if the code has already been used
            const ExistingUserWithusedCode = await this.userService.findUser({ code });

            if (ExistingUserWithusedCode) {
                throw new HttpException(409, 'This Code is Used');
            }

            // Check if the code exists
            const preCode = await this.codeService.findCode({ code });

            if (!preCode) {
                throw new HttpException(404, 'Invalid Code Provided');
            }

            const Postcode = await this.codeService.updateCode(
                { _id: preCode._id },
                { used: true },
                { new: true, runValidators: true }
            );

            if (!Postcode) {
                throw new HttpException(404, 'Invalid Code Supported');
            }
            // Create the user
            const user = await this.userService.createUser({ ...req.body, role: Postcode.role });

            const SupportedInfo = {
                profileState: user.profileState,
            };
            res.status(201).json({
                message: 'User registered successfully',
                SupportedInfo,
            });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public AddAdditionlHandler = async (
        req: Request<AddAdditionalInterface['params'], {}, AddAdditionalInterface['body']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;

            const existingUser = await this.userService.findUser({ _id: id });
            const initiator = App.initiator;

            if (!existingUser) {
                throw new HttpException(404, "user doesn't exist");
            }
            const image = req.file as Express.Multer.File;
            const HashName = `verifyEmail:${existingUser._id}`;
            const code = await this.codeService.findCode({ code: existingUser.code });

            const profileImg = await uploadImageToFirebase({
                image,
                path: 'doctors',
                userId: existingUser._id as string,
            });

            if (!code) {
                throw new HttpException(403, 'something went wrong with the code');
            }

            await this.codeService.updateCode(
                { _id: code._id },
                { user: existingUser._id },
                { new: true, runValidators: true }
            );

            const updatedUser = await this.userService.updateUser(
                { _id: id },
                { ...req.body, profileImg },
                { new: true, runValidators: true }
            );

            const token = await signJwt(
                { _id: existingUser._id, HashName },
                'VerTokenPrivateKey',
                'HS512',
                {
                    expiresIn: parseInt(ACCESSTOKENTTL as string) * 4,
                }
            );

            await this.redisService.createHash({
                HashName: `${HashName}:token`,
                content: { token },
                expire: parseInt(DFTOKENTTL as string),
            });

            const link = `http://localhost:3000/dashboard/verify/${token}`;

            await new SendEmail({
                to: existingUser.email,
                link,
                templateName: 'emailVerification.hbs',
                health: 'healthcare',
                year: new Date().getFullYear(),
                subject: EmailSubjects.EMAIL_VERIFICATION,
            }).execute();

            const notification = this.notificationService.systemNotifications(
                'emailVerification',
                existingUser
            );

            const createdNotification = await this.notificationService.createNotification({
                ...notification,
                user: existingUser._id,
                assignedBy: 'system',
            });

            initiator.emit(`EmailVerification${existingUser._id}`, createdNotification);

            res.status(203).json({ message: 'user info added successfully', updatedUser });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public sendEmailVerificationHandler = async (
        req: Request<SendEmailVerificationInterface['params']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;

            const existingUser = await this.userService.findUser({ _id: id });

            if (!existingUser) {
                throw new HttpException(404, "user doesn't exist");
            }

            const verified = existingUser.verified;

            if (verified) {
                throw new HttpException(400, 'email already verified');
            }

            const HashName = `verifyEmail:${existingUser._id}`;

            const ExitingToken = await this.redisService.checkHash(`${HashName}:token`, 'token');

            if (ExitingToken) {
                throw new HttpException(400, 'verification email already has sent');
            }

            const token = await signJwt(
                { _id: existingUser._id, HashName },
                'VerTokenPrivateKey',
                'HS512',
                {
                    expiresIn: parseInt(ACCESSTOKENTTL as string) * 4,
                }
            );

            await this.redisService.createHash({
                HashName: `${HashName}:token`,
                content: { token },
                expire: parseInt(DFTOKENTTL as string),
            });

            const link = `http://localhost:3000/dashboard/verify/${token}`;

            await new SendEmail({
                to: existingUser.email,
                link,
                templateName: 'emailVerification.hbs',
                health: 'healthcare',
                year: new Date().getFullYear(),
                subject: EmailSubjects.EMAIL_VERIFICATION,
            }).execute();

            res.status(201).json({ message: 'A verification email has sent to your email' });
        } catch (error: any) {
            this.handleError(res, error);
        }
    };

    public verifyEmailHandler = async (
        req: Request<SendEmailVerificationInterface['params']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;

            const existingUser = await this.userService.findUser({ _id: id });

            if (!existingUser) {
                throw new HttpException(404, "user doesn't exist");
            }

            const HashName = `verifyEmail:${existingUser._id}`;

            const token = await this.redisService.checkHash(`${HashName}:token`, 'token');

            if (!token) {
                res.status(404).json({ message: 'token has expired', state: false });
                return;
            }

            const { valid } = await verifyJwt(token, 'VerTokenPrivateKey', 'HS512');

            if (!valid) {
                res.status(403).json({ message: 'invalid token', state: false });
                return;
            }

            await this.userService.updateUser(
                { _id: existingUser._id },
                { verified: true },
                { runValidators: true, new: true }
            );

            await this.redisService.DelHash(`${HashName}:token`, 'token');

            res.status(201).json({ message: 'email verified successfully', state: true });
        } catch (error: any) {
            this.handleError(res, error);
        }
    };

    public getUser = async (req: Request<AddAdditionalInterface['params'], {}>, res: Response) => {
        try {
            const id = req.params.id;

            const existingUser = await this.userService.findUser({ _id: id });

            if (!existingUser) {
                throw new HttpException(404, "user doesn't exist");
            }

            res.status(200).json({ existingUser });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public getAllUsersHandler = async (
        req: Request<ChangeUserInterface['params']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;

            const existingUser = await this.userService.findUser({ _id: id });

            if (!existingUser) {
                throw new HttpException(404, "user doesn't exist");
            }
            const users = await this.userService.getAllUsers({
                _id: { $ne: existingUser._id },
                role: {
                    $nin: ['Charge Nurse', 'Head Nurse', 'Head Secretary', 'Charge Secretary'],
                },
            });

            if (users.length < 1) {
                throw new HttpException(404, 'No Doctors');
            }

            res.status(200).json({ message: 'success', users });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public ChangeUserInformationHandler = async (
        req: Request<ChangeUserInterface['params'], {}, ChangeUserInterface['body']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;

            const user = await this.userService.findUser({ _id: id });

            const data = {
                name: req.body.name,
                occupation: req.body.occupation || user?.occupation,
                gender: req.body.gender || user?.gender,
                height: req.body.height || user?.height,
                weight: req.body.weight || user?.weight,
            };

            if (!user) {
                throw new HttpException(404, "user doesn't exist");
            }
            const changed = Object.entries(data).every(
                ([key, value]) => user[key as keyof typeof user] === value
            );

            if (changed) {
                res.status(200).json({ message: 'No Changes', state: true });
                return;
            }
            const updatedUser = await this.userService.updateUser(
                { _id: id },
                { ...req.body },
                { new: true, runValidators: true }
            );

            res.status(200).json({ message: 'information changed successfully', updatedUser });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    public changePasswordHandler = async (
        req: Request<ChangePasswordInterface['params'], {}, ChangePasswordInterface['body']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;
            const password = req.body.password;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new HttpException(400, 'invalid id provided');
            }
            const existingUser = await this.userService.findUser({ _id: id });

            const currDate = new Date(existingUser?.passwordUpdatedAt as Date);
            const AllowedDateToChange = addWeeks(currDate, 1);

            if (!existingUser || !id) {
                throw new HttpException(403, 'Forbidden');
            }
            if (password === req.body.newPassword) {
                throw new HttpException(400, 'No changes');
            }

            const email = existingUser.email;

            const confirmUser = await this.userService.validatePassword({ email, password });

            if (!confirmUser) {
                throw new HttpException(403, 'Invalid password');
            }

            if (AllowedDateToChange > new Date()) {
                throw new HttpException(400, 'Too Many Changes at a short time');
            }
            const hashedPassword = await hashPassword({
                password: req.body.newPassword,
            });

            await this.userService.updateUser(
                { email },
                { password: hashedPassword, passwordUpdatedAt: Date.now() },
                { new: true, runValidators: true }
            );

            res.status(200).json({ message: 'password has changed successfully' });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public SendResetEmailHandler = async (
        req: Request<{}, {}, ResetPasswordInterface['body']>,
        res: Response
    ) => {
        try {
            const email = req.body.email;
            const id = req.body.id;

            const existingUser = await this.userService.findUser({ email });

            if (!existingUser) {
                throw new HttpException(403, 'there is no account associated with this email');
            }

            const HashName = `resetpassword:${existingUser._id}`;

            const lastEmail = await this.redisService.checkHash(`${HashName}:lastemail`, 'content');

            const existingToken = await this.redisService.checkHash(`${HashName}:token`, 'token');

            if (lastEmail) {
                throw new HttpException(400, "can't reset password right now");
            }

            if (existingToken) {
                throw new HttpException(400, 'email already sent');
            }

            const obj = {
                _id: existingUser._id as string,
                email: existingUser.email,
                HashName,
            };

            const token = await signJwt(obj, 'VerTokenPrivateKey', 'HS512', {
                expiresIn: (parseInt(TEMPORALTOKENTTL as string) * 12) as number,
            });

            let link;

            if (id === 'undefined') {
                link = `${this.FRONTEND_URL}reset/${token}`;
            } else {
                link = `${this.FRONTEND_URL}dashboard/settings/setting/reset/${token}`;
            }
            await new SendEmail({
                to: existingUser.email,
                templateName: 'passwordreset.hbs',
                link,
                subject: EmailSubjects.PASSWORD_RESET,
            }).execute();

            const content = {
                content: addHours(new Date(), 2).toISOString(),
            };

            await this.redisService.createHash({
                HashName: `${HashName}:token`,
                content: { token },
                expire: parseInt(DFTOKENTTL as string),
            });

            await this.redisService.createHash({
                HashName: `${HashName}:lastemail`,
                content: content,
                expire: parseInt(DFTOKENTTL as string) * 3,
            });

            res.status(200).json({ message: 'email sent successfully' });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public CheckTokenHandler = async (
        req: Request<CheckTokenExistanceInterface['params']>,
        res: Response
    ) => {
        try {
            const token = req.params.token;
            const KeyType = req.query.KeyType as 'VerTokenPrivateKey' | 'MULTI_AUTH_SECRET';

            const { decoded, valid } = await verifyJwt(token, KeyType, 'HS512');

            if (!valid) {
                res.status(403).json({ message: 'invalid token', state: false });
                return;
            }

            const user = decoded as UserDocument | any;

            const existingUser = await this.userService.findUser({ _id: user._id });

            if (!existingUser) {
                throw new HttpException(403, 'Forbidden');
            }

            const HashName = user.HashName;

            const existingToken = await this.redisService.checkHash(`${HashName}:token`, 'token');

            if ((existingToken && token != existingToken) || !existingToken) {
                res.status(404).json({ message: 'invalid token', state: false });
                return;
            }
            res.status(200).json({ message: 'valid token', state: true });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public ResetPasswordHandler = async (
        req: Request<ResetPasswordNewInterface['params'], {}, ResetPasswordNewInterface['body']>,
        res: Response
    ) => {
        try {
            const token = req.params.token;

            const { decoded, valid } = await verifyJwt(token, 'VerTokenPrivateKey', 'HS512');

            if (!valid) {
                throw new HttpException(403, 'Invalid token');
            }

            const user = decoded as UserDocument;
            const existingUser = await this.userService.findUser({ _id: user._id });

            if (!existingUser) {
                throw new HttpException(403, 'Forbidden');
            }

            const HashName = `resetpassword:${existingUser._id}:token`;

            const existingToken = await this.redisService.checkHash(HashName, 'token');

            if (!existingToken) {
                res.status(404).json({ message: 'invalid token', state: false });
                return;
            }

            const hashedPassword = await hashPassword({
                password: req.body.newPassword,
            });

            await this.userService.updateUser(
                { email: existingUser.email },
                { password: hashedPassword, passwordUpdatedAt: Date.now() },
                { new: true, runValidators: true }
            );

            await this.redisService.DelHash(HashName, 'token');
            res.status(200).json({ message: 'password has changed successfully' });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public SendChangeEmailHandler = async (
        req: Request<ChangeEmailInterface['params'], {}, ChangeEmailInterface['body']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;
            const newEmail = req.body.email;

            const existingUser = await this.userService.findUser({ _id: id });
            const userWithEmail = await this.userService.findUser({ email: newEmail });

            if (!existingUser || !id || existingUser.email === newEmail || userWithEmail) {
                throw new HttpException(403, `Can't make changes`);
            }

            const HashName = `newEmail:${existingUser._id}`;

            const lastEmail = await this.redisService.checkHash(`${HashName}:lastemail`, 'content');

            const existingOtp = await this.redisService.checkHash(`${HashName}:otp`, 'otp');

            const existingToken = await this.redisService.checkHash(`${HashName}:token`, 'token');

            const repeatStepOne = async ({ existedToken }: { existedToken: boolean }) => {
                const otp = generateOtp({ length: 8, type: 'number' });
                let token = null;

                if (!existedToken) {
                    token = await signJwt(
                        { _id: existingUser._id, email: newEmail, HashName },
                        'VerTokenPrivateKey',
                        'HS512',
                        {
                            expiresIn: parseInt(ACCESSTOKENTTL as string) * 4,
                        }
                    );
                }

                const sent = await new SendEmail({
                    to: newEmail,
                    templateName: 'changeEmail.hbs',
                    otp,
                    health: 'healthcare',
                    year: new Date().getFullYear(),
                    subject: EmailSubjects.EMAIL_CHANGE,
                }).execute();
                return { otp, token, sent };
            };

            if (existingToken) {
                if (existingOtp) {
                    throw new HttpException(400, 'email already sent');
                }
                const { otp } = await repeatStepOne({ existedToken: true });

                await this.redisService.createHash({
                    HashName: `${HashName}:otp`,
                    content: { otp },
                    expire: parseInt(OTPTTL as string),
                });

                res.status(200).json({
                    message: 'otp has been sent again',
                    token: existingToken,
                });
                return;
            }

            if (lastEmail) {
                throw new HttpException(400, "can't change email right now");
            }

            const { otp, token } = await repeatStepOne({ existedToken: false });

            await this.redisService.createHash({
                HashName: `${HashName}:otp`,
                content: { otp },
                expire: parseInt(OTPTTL as string),
            });

            await this.redisService.createHash({
                HashName: `${HashName}:token`,
                content: { token: token },
                expire: parseInt(DFTOKENTTL as string),
            });

            res.status(200).json({
                message: 'verification email sent',
                token: token || existingToken,
            });
        } catch (error) {
            this.handleError(res, error);
        }
    };
    public checkOtpEmailChangeHandler = async (
        req: Request<CheckOtpInterface['params'], {}, CheckOtpInterface['body']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;

            const existingUser = await this.userService.findUser({ _id: id });

            if (!existingUser) {
                throw new HttpException(403, 'Forbidden');
            }
            const HashName = `newEmail:${existingUser._id}`;
            const existingOtp = await this.redisService.checkHash(`${HashName}:otp`, 'otp');

            const token = await this.redisService.checkHash(`${HashName}:token`, 'token');

            if (!existingOtp || !token || existingOtp !== req.body.otp) {
                res.status(404).json({ message: 'invalid code', state: false });
                return;
            }

            const { decoded, valid } = await verifyJwt(token, 'VerTokenPrivateKey', 'HS512');

            if (!valid) {
                res.status(403).json({ message: 'invalid token', state: false });
                return;
            }

            interface userSchema {
                _id: string;
                email: string;
            }

            const user = decoded as userSchema;

            await this.userService.updateUser(
                {
                    _id: user._id,
                },
                { email: user.email },
                { new: true, runValidators: true }
            );

            await this.redisService.createHash({
                HashName: `${HashName}:lastemail`,
                content: { content: addHours(new Date(), 2).toISOString() },
                expire: parseInt(REFRESHTOKENTTL as string),
            });

            await this.redisService.DelHash(`${HashName}:otp`, 'otp');
            await this.redisService.DelHash(`${HashName}:token`, 'token');

            res.status(201).json({ message: 'email has changed successfully', state: true });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public changeProfilePictureHandler = async (
        req: Request<ChangeProfilePictureInterface['params']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;

            const image = req.file as Express.Multer.File;

            const existingUser = await this.userService.findUser({ _id: id });

            if (!existingUser) {
                throw new HttpException(403, 'Forbidden');
            }
            const HashName = `profilePicture:${existingUser._id}:change`;

            const lastTimeChanged = await this.redisService.checkHash(HashName, 'content');

            if (lastTimeChanged) {
                throw new HttpException(400, "can't change profile picture right now");
            }

            const profileImg = await uploadImageToFirebase({
                image,
                path: 'doctors',
                userId: existingUser._id as string,
            });

            const update = await this.userService.updateUser(
                { _id: id },
                { profileImg },
                { new: true, runValidators: true }
            );
            if (!update) {
                throw new HttpException(
                    400,
                    'something went wrong while changing the profile picture'
                );
            }

            const content = addHours(update.profileImg?.uploadedAt as Date, 2).toISOString();

            await this.redisService.createHash({
                HashName,
                content: { content },
                expire: parseInt(DFTOKENTTL as string) * 24 * 3,
            });
            res.status(201).json({ message: 'profile picture updated successfully' });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public reIssueAccessTokenHandler = async (req: Request, res: Response) => { 
        // issue solved: 2025:08:15 14:52:48:info GET /api/auth/reIssueAccessToken 200 10.377 ms - -

        // explaintion: the server were getting respawned because of the live reloading,
        // and when this handler got called from the client server it fails when the server keeps respawning time after time 
        // solved dockerized the server.
        try {
            const refreshToken = get(req, 'headers.x-refresh') as string;
            const temporalToken = get(req, 'headers.x-temporal-token') as string;
            
            
            if (temporalToken) {
                const { decoded, valid } = await verifyJwt(
                    temporalToken,
                    `MULTI_AUTH_SECRET`,
                    'HS512'
                );

                if (!valid) {
                    res.status(403).json({
                        message: 'invalid temporal token',
                        sessionState: false,
                    });
                    return;
                }
                const user = decoded as UserDocument;

                const existingUser = await this.userService.findUser({ _id: user._id });
                if (!existingUser) {
                    res.status(403).json({ message: 'forbidden', sessionState: false });
                    return;
                }
                const obj = {
                    user: user._id as string,
                    userAgent: req.get('user-agent') || '',
                    role: user.role,
                };
                const session = await this.sessionService.createSession({ ...obj });

                const accessToken = await signJwt(
                    {
                        ...existingUser,
                        id: existingUser._id,
                        session: session._id,
                    },
                    'accessTokenPrivateKey',
                    'RS256',
                    { expiresIn: parseInt(ACCESSTOKENTTL as string) }
                );
                const refreshToken = await signJwt(
                    { ...existingUser, session: session._id },
                    'refreshTokenPrivateKey',
                    'RS256',
                    { expiresIn: parseInt(REFRESHTOKENTTL as string) }
                );
                res.status(200).json({
                    message: 'logged in successfully ',
                    accessToken,
                    refreshToken,
                    sessionState: true,
                });
                return;
            }

            const accessToken = await this.sessionService.reIssueAccessToken(refreshToken);

            if (!accessToken) {
                res.status(403).json({ message: 'session has expired', sessionState: false });
                return;
            }

            if (accessToken) {
                res.setHeader('Authorization', `${accessToken}`);
            }

            res.status(200).json({ accessToken, refreshToken, sessionState: true });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public multiAuthOtpHandler = async (
        req: Request<SendEmailVerificationInterface['params']>, // why use? containing only id params
        res: Response
    ) => {
        try {
            const id = req.params.id;
            const existingUser = await this.userService.findUser({ _id: id });

            if (!existingUser) {
                throw new HttpException(403, 'Forbidden');
            }
            const mulitAuth = existingUser.mfa_state;

            if (mulitAuth) {
                const disabledMulti = await this.userService.updateUser(
                    { _id: existingUser._id },
                    { mfa_state: false },
                    { runValidators: true, new: true }
                );

                res.status(201).json({
                    message: 'mulit-factor has been disabled',
                    mfa_state: disabledMulti?.mfa_state,
                });
                return;
            }
            const HashName = `multi-auth-enabling:${existingUser._id}`;

            const lastOtp = await this.redisService.checkHash(`${HashName}:otp`, 'otp');

            if (lastOtp) {
                throw new HttpException(400, 'otp has already sent in less than 5 mins');
            }
            const otp = generateOtp({ length: 8, type: 'string' });

            const existedToken = await this.redisService.checkHash(`${HashName}:token`, 'token');

            if (existedToken) {
                const link = `${this.FRONTEND_URL}dashboard/settings/setting/verify/${existedToken}`;

                await this.redisService.createHash({
                    HashName: `${HashName}:otp`,
                    content: { otp },
                    expire: parseInt(OTPTTL as string),
                });

                await new SendEmail({
                    to: existingUser.email,
                    templateName: 'multiAuth.hbs',
                    link,
                    otp,
                    health: 'healthcare',
                    year: new Date().getFullYear(),
                    subject: EmailSubjects.MFA_ENABLING,
                }).execute();

                const TTL = await this.redisService.GetHashExpiration(`${HashName}:otp`);

                res.status(201).json({
                    message: 'another otp has sent to your email',
                    token: existedToken,
                    TTL,
                });
                return;
            }

            const object = {
                _id: existingUser._id,
                email: existingUser.email,
                HashName,
            };

            const token = await signJwt(object, 'MULTI_AUTH_SECRET', 'HS512', {
                expiresIn: parseInt(ACCESSTOKENTTL as string) * 4,
            });

            const link = `${this.FRONTEND_URL}dashboard/settings/setting/verify/${token}`;

            await this.redisService.createHash({
                HashName: `${HashName}:otp`,
                content: { otp },
                expire: parseInt(OTPTTL as string),
            });

            await this.redisService.createHash({
                HashName: `${HashName}:token`,
                content: { token },
                expire: parseInt(DFTOKENTTL as string),
            });

            await new SendEmail({
                to: existingUser.email,
                templateName: 'multiAuth.hbs',
                link,
                otp,
                health: 'healthcare',
                year: new Date().getFullYear(),
                subject: EmailSubjects.MFA_ENABLING,
            }).execute();

            const TTL = await this.redisService.GetHashExpiration(`${HashName}:otp`);

            res.status(201).json({
                message: 'A verification link with otp has sent to your email',
                token,
                TTL,
            });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public verifyEnablingMultiAuthOtpHandler = async (
        req: Request<CheckOtpInterface['params'], {}, CheckOtpInterface['body']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;

            const otp = req.body.otp;

            const existingUser = await this.userService.findUser({ _id: id });

            if (!existingUser) {
                throw new HttpException(403, 'Forbidden');
            }

            const HashName = `multi-auth-enabling:${existingUser._id}`;

            const existedToken = await this.redisService.checkHash(`${HashName}:token`, 'token');

            if (!existedToken) {
                res.status(400).json({ message: 'token has expired', state: false });
                return;
            }

            const validOtp = await this.redisService.checkHash(`${HashName}:otp`, 'otp');

            if (!validOtp || otp !== validOtp) {
                res.status(400).json({ message: 'otp has expired', state: false });
                return;
            }

            await this.userService.updateUser(
                { _id: existingUser._id },
                { mfa_state: true },
                { runValidators: true, new: true }
            );

            await this.redisService.DelHash(`${HashName}:otp`, 'otp');

            await this.redisService.DelHash(`${HashName}:token`, 'token');

            const currDate = new Date();

            await new SendEmail({
                to: existingUser.email,
                templateName: 'mfaEnabled.hbs',
                date: addHours(currDate, 2).toISOString(),
                health: 'healthcare',
                year: new Date().getFullYear(),
                subject: EmailSubjects.MFA_ENABLED,
            }).execute();

            res.status(200).json({
                message: 'mulit-factor authentication has been enabled',
                state: true,
            });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    // test handler only for deleting unverified users
    // This should be run manually or scheduled using a cron job
    // It is not recommended to use this in production without proper checks

    public deleteUnVerifiedUsersHandler = async (req: Request, res: Response) => {
        try {
            const unverified = await this.userService.getAllUsers({ verified: false });

            if (!unverified || unverified.length < 1) {
                throw new HttpException(404, 'no unverified users found');
            }

            for (let user of unverified) {
                const HashName = `emailVerificationAlert:${user._id}`;

                const lastEmail = await this.redisService.checkHash(HashName, 'lastemail');

                if (lastEmail) {
                    throw new HttpException(403, 'User is still within the warning phase');
                }

                await new SendEmail({
                    to: user.email,
                    templateName: 'emailDeletion.hbs',
                    health: 'healthcare',
                    year: new Date().getFullYear(),
                    subject: EmailSubjects.EMAIL_DELETION,
                }).execute();

                await deleteImage(user.profileImg?.path);

                await this.codeService.deleteCode({ user: user._id });

                await this.userService.deleteUser({ _id: user._id });

                await this.redisService.DelHash(HashName, 'lastemail');
            }
            res.status(200).json({ message: 'unverified users deleted successfully' });
        } catch (error) {
            this.handleError(res, error);
        }
    };
}

export default UserController;
