import { Request, Response } from 'express';
import { LogOutSchemaInterface, SessionSchemaInterface } from '../schemas/session.schema';
import UserService from '../services/user.service';
import { signJwt } from '../utils/jwt.sign';
import {
    ACCESSTOKENTTL,
    FRONTEND_URI_DEV,
    NODE_ENV,
    REFRESHTOKENTTL,
    TEMPORALTOKENTTL,
} from 'config';
import CodeService from '../services/code.service';
import { generateOtp } from '@/utils/backevents';
import { CheckOtpInterface } from '@/schemas/user.schema';
import HttpException from '@/exceptions/httpException';
import { BaseController } from './base.controller';
import SessionService from '@/services/session.service';
import { RedisConnection, RedisServices } from '@/utils/redis';
import { EmailSubjects, SendEmail } from '@/utils/emailUtils';

class SessionController extends BaseController {
    private userService: UserService;
    private sessionService: SessionService;
    private codeService: CodeService;
    private static FRONTEND_URL: string | undefined;
    private redisService: RedisServices
    constructor() {
        super();
        this.userService = new UserService();
        this.sessionService = new SessionService();
        this.codeService = new CodeService();
        this.redisService = new RedisServices(RedisConnection.getInstance().getClient());
        SessionController.FRONTEND_URL = FRONTEND_URI_DEV;
    }

    public login = async (req: Request<{}, {}, SessionSchemaInterface['body']>, res: Response) => {
        try {
            const user = await this.userService.validatePassword(req.body);

            if (!user) {
                throw new HttpException(403, 'invalid email or password');
            }

            const obj = {
                user: user._id as string,
                userAgent: req.get('user-agent') || '',
                role: user.role,
            };

            const code = await this.codeService.findCode({ used: true }); //  need to be refactored as a next piece of middleware

            if (!code) {
                throw new HttpException(400, 'something went wrong with the subscribtion plan');
            }

            const activeSession = await this.sessionService.getSession({
                user: user._id,
                valid: true,
            });

            if (activeSession) {
                throw new HttpException(403, 'another session is already active');
            }
            if (user.mfa_state) {
                const hashName = `mfa:${user._id}`;

                const existingToken = await this.redisService.checkHash(`${hashName}:token`, 'token');

                const existingOtp = await this.redisService.checkHash(`${hashName}:otp`, 'otp');

                if (existingToken && existingOtp) {
                    res.status(200).json({
                        message: 'An otp has already been sent to your email before',
                        temporalToken: existingToken,
                        mfa_state: user.mfa_state,
                    });
                    return;
                }
                if (existingToken) {
                    const otp = generateOtp({ length: 8, type: 'number' });

                    await this.redisService.createHash({
                        HashName: `${hashName}:otp`,
                        content: { otp },
                        expire: parseInt(TEMPORALTOKENTTL as string),
                    });

                    const link = `${SessionController.FRONTEND_URL}/multi-auth-verification/${existingToken}`;

                    await new SendEmail({
                        to: user.email,
                        link,
                        templateName: 'multiAuthOtp.hbs',
                        health: 'HealthCare',
                        year: new Date().getFullYear(),
                        otp,
                        subject: EmailSubjects.MFA_STEP_OTP,
                    }).execute();

                    res.status(200).json({
                        message: 'An otp has been sent to your email',
                        temporalToken: existingToken,
                        mfa_state: user.mfa_state,
                    });
                    return;
                }

                const updatedUser = await this.userService.updateUser(
                    { _id: user._id },
                    { isPartiallyAuthenticated: true },
                    { runValidators: true, new: true }
                );
                if (!updatedUser) {
                    throw new HttpException(404, 'user not found');
                }

                const obj = {
                    _id: user._id as string,
                    mfa_state: user.mfa_state,
                    role: user.role,
                    profileState: user.profileState,
                    HashName: `${hashName}`,
                    isFullyAuthenticated: user.isFullyAuthenticated,
                    isPartiallyAuthenticated: updatedUser.isPartiallyAuthenticated,
                };
                const token = await signJwt(obj, 'MULTI_AUTH_SECRET', 'HS512', {
                    expiresIn: (parseInt(TEMPORALTOKENTTL as string) * 12) as number,
                });
                await this.redisService.createHash({
                    HashName: `${hashName}:token`,
                    content: { token },
                    expire: (parseInt(TEMPORALTOKENTTL as string) * 12) as number,
                });

                const otp = generateOtp({ length: 8, type: 'number' });

                await this.redisService.createHash({
                    HashName: `${hashName}:otp`,
                    content: { otp },
                    expire: parseInt(TEMPORALTOKENTTL as string),
                });

                const link = `${SessionController.FRONTEND_URL}/multi-auth-verification/${token}`;

                await new SendEmail({
                    to: user.email,
                    link,
                    templateName: 'multiAuthOtp.hbs',
                    health: 'HealthCare',
                    year: new Date().getFullYear(),
                    otp,
                    subject: EmailSubjects.MFA_STEP_OTP,
                }).execute();

                res.status(200).json({
                    message: 'mfa is enabled, please verify your code',
                    temporalToken: token,
                    mfa_state: user.mfa_state,
                });
                return;
            }

            const session = await this.sessionService.createSession({ ...obj });

            const accessToken = await signJwt(
                {
                    ...user,
                    id: user._id,
                    session: session._id,
                    codePlan: code.expiration,
                    isPartiallyAuthenicated: user.isPartiallyAuthenticated,
                },
                'accessTokenPrivateKey',
                'RS256',
                { expiresIn: parseInt(ACCESSTOKENTTL as string) }
            );

            const refreshToken = await signJwt(
                { ...user, session: session._id, codePlan: code.expiration },
                'refreshTokenPrivateKey',
                'RS256',
                { expiresIn: parseInt(REFRESHTOKENTTL as string) }
            );

            res.status(200).json({ message: 'logged in successfully ', accessToken, refreshToken });
        } catch (error) {
            this.handleError(res, error);
        }
    };
    public verifyMultiAuthOtpHandler = async (
        req: Request<CheckOtpInterface['params'], {}, CheckOtpInterface['body']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;

            const user = await this.userService.findUser({ _id: id });

            const otp = req.body.otp;

            if (!user) {
                throw new HttpException(404, 'user not found');
            }
            const hashName = `mfa:${user?._id}`;

            const existingToken = await this.redisService.checkHash(`${hashName}:token`, 'token');

            const existingOtp = await this.redisService.checkHash(`${hashName}:otp`, 'otp');

            if (!existingToken || !existingOtp) {
                res.status(404).json({ message: 'token or otp not found', state: false });
                return;
            }
            if (existingOtp !== otp) {
                res.status(403).json({ message: 'invalid otp', state: false });
                return;
            }

            await this.userService.updateUser(
                { _id: user._id },
                { isFullyAuthenticated: true, isPartiallyAuthenticated: false },
                { runValidators: true, new: true }
            );
            await new Promise(resolve => setTimeout(resolve, 1500));

            await this.redisService.DelHash(`${hashName}:token`, 'token');

            await this.redisService.DelHash(`${hashName}:otp`, 'otp');

            res.status(200).json({ message: 'otp verified successfully', state: true });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public getUserSessions = async (req: Request, res: Response) => {
        try {
            const userId = res.locals.user._id;

            const sessions = await this.sessionService.getSession({ user: userId, valid: true });

            res.status(200).json({ sessions });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public logout = async (req: Request<LogOutSchemaInterface['params']>, res: Response) => {
        try {
            const id = req.params.id;

            const user = await this.userService.findUser({ _id: id });

            if (!user) {
                throw new HttpException(404, 'user not found');
            }
            const session = await this.sessionService.getSession({ user: user._id, valid: true });
            if (!session) {
                throw new HttpException(404, 'session not found');
            }

            await this.sessionService.updateSession(
                { user: user._id, valid: true },
                { valid: false },
                { runValidators: true, new: true }
            );
            await this.userService.updateUser(
                { _id: user._id },
                { isFullyAuthenticated: false },
                { runValidators: true, new: true }
            );
            res.status(200).json({ message: 'logged out successfully' });
        } catch (error) {
            this.handleError(res, error);
        }
    };
}

export default SessionController;
