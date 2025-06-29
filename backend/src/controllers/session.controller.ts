import { Request, Response } from 'express';
import { LogOutSchemaInterface, SessionSchemaInterface } from '../schemas/session.schema';
import { findUser, updateUser, validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt.sign';
import { createSession, getSession, updateSession } from '../services/session.service';
import {
    ACCESSTOKENTTL,
    FRONTEND_URI_DEV,
    NODE_ENV,
    REFRESHTOKENTTL,
    TEMPORALTOKENTTL,
} from 'config';
import { findCode } from '../services/code.service';
import { checkHash, createHash, DelHash } from '@/utils/redis';
import { generateOtp, sendEmail } from '@/utils/backevents';
import { CheckOtpInterface } from '@/schemas/user.schema';
import HttpException from '@/exceptions/httpException';

const FRONTEND_URL = NODE_ENV === 'development' ? FRONTEND_URI_DEV : '';

export const login = async (
    req: Request<{}, {}, SessionSchemaInterface['body']>,
    res: Response
) => {
    try {
        const user = await validatePassword(req.body);

        if (!user) {
            res.status(403).json({ message: 'invalid email or password' });
            return;
        }

        const obj = {
            user: user._id as string,
            userAgent: req.get('user-agent') || '',
            role: user.role,
        };

        const code = await findCode({ used: true }); //  need to be refactored as a next piece of middleware

        if (!code) {
            res.status(404).json({ message: 'something went wrong with the subscribtion plan' });
            return;
        }

        const activeSession = await getSession({ user: user._id, valid: true });

        if (activeSession) {
            res.status(403).json({
                message: 'another session is already active',
            });
            return;
        }
        if (user.mfa_state) {
            const hashName = `mfa:${user._id}`;

            const existingToken = await checkHash(`${hashName}:token`, 'token');

            const existingOtp = await checkHash(`${hashName}:otp`, 'otp');

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

                await createHash({
                    HashName: `${hashName}:otp`,
                    content: { otp },
                    expire: parseInt(TEMPORALTOKENTTL as string),
                });

                const link = `${FRONTEND_URL}/multi-auth-verification/${existingToken}`;

                await sendEmail({
                    to: user.email,
                    link,
                    templateName: 'multiAuthOtp.hbs',
                    health: 'HealthCare',
                    year: new Date().getFullYear(),
                    otp,
                });
                res.status(200).json({
                    message: 'An otp has been sent to your email',
                    temporalToken: existingToken,
                    mfa_state: user.mfa_state,
                });
                return;
            }

            const updatedUser = await updateUser(
                { _id: user._id },
                { isPartiallyAuthenicated: true },
                { runValidators: true, new: true }
            );
            if (!updatedUser) {
                res.status(404).json({ message: 'user not found' });
                return;
            }

            const obj = {
                _id: user._id as string,
                mfa_state: user.mfa_state,
                role: user.role,
                profileState: user.profileState,
                HashName: `${hashName}`,
                isFullyAuthenicated: user.isFullyAuthenicated,
                isPartiallyAuthenicated: updatedUser.isPartiallyAuthenicated,
            };
            const token = await signJwt(obj, 'MULTI_AUTH_SECRET', 'HS512', {
                expiresIn: (parseInt(TEMPORALTOKENTTL as string) * 12) as number,
            });
            await createHash({
                HashName: `${hashName}:token`,
                content: { token },
                expire: (parseInt(TEMPORALTOKENTTL as string) * 12) as number,
            });

            const otp = generateOtp({ length: 8, type: 'number' });

            await createHash({
                HashName: `${hashName}:otp`,
                content: { otp },
                expire: parseInt(TEMPORALTOKENTTL as string),
            });

            const link = `${FRONTEND_URL}/multi-auth-verification/${token}`;

            await sendEmail({
                to: user.email,
                link,
                templateName: 'multiAuthOtp.hbs',
                health: 'HealthCare',
                year: new Date().getFullYear(),
                otp,
            });

            res.status(200).json({
                message: 'mfa is enabled, please verify your code',
                temporalToken: token,
                mfa_state: user.mfa_state,
            });
            return;
        }

        const session = await createSession({ ...obj });

        const accessToken = await signJwt(
            {
                ...user,
                id: user._id,
                session: session._id,
                codePlan: code.expiration,
                isPartiallyAuthenicated: user.isPartiallyAuthenicated,
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
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyMultiAuthOtpHandler = async (
    req: Request<CheckOtpInterface['params'], {}, CheckOtpInterface['body']>,
    res: Response
) => {
    try {
        const id = req.params.id;

        const user = await findUser({ _id: id });

        const otp = req.body.otp;

        if (!user) {
            res.status(404).json({ message: 'user not found' });
            return;
        }
        const hashName = `mfa:${user?._id}`;

        const existingToken = await checkHash(`${hashName}:token`, 'token');

        const existingOtp = await checkHash(`${hashName}:otp`, 'otp');

        if (!existingToken || !existingOtp) {
            res.status(404).json({ message: 'token or otp not found', state: false });
            return;
        }
        if (existingOtp !== otp) {
            res.status(403).json({ message: 'invalid otp', state: false });
            return;
        }

        await updateUser(
            { _id: user._id },
            { isFullyAuthenicated: true, isPartiallyAuthenicated: false },
            { runValidators: true, new: true }
        );
        await new Promise(resolve => setTimeout(resolve, 1500));

        await DelHash(`${hashName}:token`, 'token');

        await DelHash(`${hashName}:otp`, 'otp');

        res.status(200).json({ message: 'otp verified successfully', state: true });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
        throw new HttpException(500, error.message);
    }
};

export const getUserSessions = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user._id;

        const sessions = await getSession({ user: userId, valid: true });

        res.status(200).json({ sessions });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req: Request<LogOutSchemaInterface['params']>, res: Response) => {
    try {
        const id = req.params.id;

        const user = await findUser({ _id: id });
        if (!user) {
            res.status(404).json({ message: 'user not found' });
            return;
        }
        const session = await getSession({ user: user._id, valid: true });
        if (!session) {
            res.status(404).json({ message: 'session not found' });
            return;
        }

        await updateSession(
            { user: user._id, valid: true },
            { valid: false },
            { runValidators: true, new: true }
        );
        await updateUser(
            { _id: user._id },
            { isFullyAuthenicated: false },
            { runValidators: true, new: true }
        );
        res.status(200).json({ message: 'logged out successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
