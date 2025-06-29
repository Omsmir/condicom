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
import {
    createUser,
    deleteUser,
    findUser,
    getAllUsers,
    updateUser,
    validatePassword,
} from '../services/user.service';
import { deleteCode, findCode, updateCode } from '../services/code.service';

import mongoose from 'mongoose';
import { generateOtp, hashPassword, sendEmail, systemNotifications } from '../utils/backevents';
import { addHours, addWeeks } from 'date-fns';
import { checkHash, createHash, DelHash, GetHashExpiration } from '../utils/redis';
import { signJwt, verifyJwt } from '../utils/jwt.sign';
import { UserDocument } from '../models/user.model';
import { get } from 'lodash';
import { createSession, reIssueAccessToken } from '../services/session.service';
import { createNotification } from '../services/notifications.service';
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

const FRONTEND_URL = NODE_ENV === 'development' ? FRONTEND_URI_DEV : '';
export const createUserHandler = async (
    req: Request<{}, {}, CreateUserInterface['body']>,
    res: Response
) => {
    try {
        const email = req.body.email;
        const code = req.body.code;

        // Check if the user already exists
        const existingUser = await findUser({ email });

        if (existingUser) {
            res.status(403).json({ message: 'User already exists' });
            return;
        }

        // Check if the code has already been used
        const ExistingUserWithusedCode = await findUser({ code });

        if (ExistingUserWithusedCode) {
            res.status(409).json({ message: 'This Code is Used' });
            return;
        }

        // Check if the code exists
        const preCode = await findCode({ code });

        if (!preCode) {
            res.status(404).json({ message: 'Invalid Code Provided' });
            return;
        }

        const Postcode = await updateCode(
            { _id: preCode._id },
            { used: true },
            { new: true, runValidators: true }
        );

        if (!Postcode) {
            res.status(404).json({ message: 'Invalid Code Supported' });
            return;
        }
        // Create the user
        const user = await createUser({ ...req.body, role: Postcode.role });

        const SupportedInfo = {
            profileState: user.profileState,
        };
        res.status(201).json({
            message: 'User registered successfully',
            SupportedInfo,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const AddAdditionlHandler = async (
    req: Request<AddAdditionalInterface['params'], {}, AddAdditionalInterface['body']>,
    res: Response
) => {
    try {
        const id = req.params.id;

        const existingUser = await findUser({ _id: id });
        const initiator = App.initiator;

        if (!existingUser) {
            res.status(404).json({ message: "user doesn't exist" });
            return;
        }
        const image = req.file as Express.Multer.File;

        const profileImg = await uploadImageToFirebase({
            image,
            path: 'doctors',
            userId: existingUser._id as string,
        });

        const code = await findCode({ code: existingUser.code });

        if (!code) {
            res.status(403).json({ message: 'something went wrong with the code' });
            return;
        }

        await updateCode(
            { _id: code._id },
            { user: existingUser._id },
            { new: true, runValidators: true }
        );

        const updatedUser = await updateUser(
            { _id: id },
            { ...req.body, profileImg },
            { new: true, runValidators: true }
        );

        const HashName = `verifyEmail:${existingUser._id}`;

        const token = await signJwt(
            { _id: existingUser._id, HashName },
            'VerTokenPrivateKey',
            'HS512',
            {
                expiresIn: parseInt(ACCESSTOKENTTL as string) * 4,
            }
        );

        await createHash({
            HashName: `${HashName}:token`,
            content: { token },
            expire: parseInt(DFTOKENTTL as string),
        });

        const link = `http://localhost:3000/dashboard/verify/${token}`;

        await sendEmail({
            to: existingUser.email,
            link,
            templateName: 'emailVerification.hbs',
            health: 'healthcare',
            year: new Date().getFullYear(),
        });

        const notification = systemNotifications('emailVerification', existingUser);

        const createdNotification = await createNotification({
            ...notification,
            user: existingUser._id,
            assignedBy: 'system',
        });

        initiator.emit(`EmailVerification${existingUser._id}`, createdNotification);

        res.status(203).json({ message: 'information added successfully', updatedUser });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const sendEmailVerificationHandler = async (
    req: Request<SendEmailVerificationInterface['params']>,
    res: Response
) => {
    try {
        const id = req.params.id;

        const existingUser = await findUser({ _id: id });

        if (!existingUser) {
            res.status(404).json({ message: "user doesn't exist" });
            return;
        }

        const verified = existingUser.verified;

        if (verified) {
            res.status(400).json({ message: 'email already verified' });
            return;
        }

        const HashName = `verifyEmail:${existingUser._id}`;

        const ExitingToken = await checkHash(`${HashName}:token`, 'token');

        if (ExitingToken) {
            res.status(400).json({ message: 'verification email already has sent' });
            return;
        }

        const token = await signJwt(
            { _id: existingUser._id, HashName },
            'VerTokenPrivateKey',
            'HS512',
            {
                expiresIn: parseInt(ACCESSTOKENTTL as string) * 4,
            }
        );

        await createHash({
            HashName: `${HashName}:token`,
            content: { token },
            expire: parseInt(DFTOKENTTL as string),
        });

        const link = `http://localhost:3000/dashboard/verify/${token}`;

        await sendEmail({
            to: existingUser.email,
            link,
            templateName: 'emailVerification.hbs',
            health: 'healthcare',
            year: new Date().getFullYear(),
        });

        res.status(201).json({ message: 'A verification email has sent to your email' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyEmailHandler = async (
    req: Request<SendEmailVerificationInterface['params']>,
    res: Response
) => {
    try {
        const id = req.params.id;

        const existingUser = await findUser({ _id: id });

        if (!existingUser) {
            res.status(404).json({ message: "user doesn't exist" });
            return;
        }

        const HashName = `verifyEmail:${existingUser._id}`;

        const token = await checkHash(`${HashName}:token`, 'token');

        if (!token) {
            res.status(404).json({ message: 'token has expired', state: false });
            return;
        }

        const { valid } = await verifyJwt(token, 'VerTokenPrivateKey', 'HS512');

        if (!valid) {
            res.status(403).json({ message: 'invalid token', state: false });
            return;
        }

        await updateUser(
            { _id: existingUser._id },
            { verified: true },
            { runValidators: true, new: true }
        );

        await DelHash(`${HashName}:token`, 'token');

        res.status(201).json({ message: 'email verified successfully', state: true });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const getUser = async (
    req: Request<AddAdditionalInterface['params'], {}>,
    res: Response
) => {
    try {
        const existingUser = await findUser({ _id: req.params.id });

        if (!existingUser) {
            res.status(404).json({ message: "user doesn't exist" });
        }

        res.status(200).json({ existingUser });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsersHandler = async (
    req: Request<ChangeUserInterface['params']>,
    res: Response
) => {
    try {
        const id = req.params.id;

        const user = await findUser({ _id: id });

        if (!user) {
            res.status(403).json({ message: 'forbidden' });
            return;
        }
        const users = await getAllUsers({
            _id: { $ne: user._id },
            role: {
                $nin: ['Charge Nurse', 'Head Nurse', 'Head Secretary', 'Charge Secretary'],
            },
        });

        if (users.length < 1) {
            res.status(404).json({ message: 'No Doctors' });
            return;
        }

        res.status(200).json({ message: 'success', users });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const ChangeUserInformationHandler = async (
    req: Request<ChangeUserInterface['params'], {}, ChangeUserInterface['body']>,
    res: Response
) => {
    try {
        const id = req.params.id;

        const user = await findUser({ _id: id });

        const data = {
            name: req.body.name,
            occupation: req.body.occupation || user?.occupation,
            gender: req.body.gender || user?.gender,
            height: req.body.height || user?.height,
            weight: req.body.weight || user?.weight,
        };

        if (!user) {
            res.status(404).json({ message: "user doesn't exist" });
            return;
        }
        const changed = Object.entries(data).every(
            ([key, value]) => user[key as keyof typeof user] === value
        );

        if (changed) {
            res.status(200).json({ message: 'No Changes', state: true });
            return;
        }
        const updatedUser = await updateUser(
            { _id: id },
            { ...req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'information changed successfully', updatedUser });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const changePasswordHandler = async (
    req: Request<ChangePasswordInterface['params'], {}, ChangePasswordInterface['body']>,
    res: Response
) => {
    try {
        const id = req.params.id;
        const password = req.body.password;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'invalid id provided' });
            return;
        }
        const existingUser = await findUser({ _id: id });

        const currDate = new Date(existingUser?.passwordUpdatedAt as Date);
        const AllowedDateToChange = addWeeks(currDate, 1);

        if (!existingUser || !id) {
            res.status(403).json({ message: 'forbidden' });
            return;
        }
        if (password === req.body.newPassword) {
            res.status(400).json({ message: 'No changes' });
            return;
        }

        const email = existingUser.email;

        const confirmUser = await validatePassword({ email, password });

        if (!confirmUser) {
            res.status(403).json({ message: 'invalid password' });
            return;
        }

        if (AllowedDateToChange > new Date()) {
            res.status(400).json({ message: 'Too Many Changes at a short time' });
            return;
        }
        const hashedPassword = await hashPassword({
            password: req.body.newPassword,
        });

        await updateUser(
            { email },
            { password: hashedPassword, passwordUpdatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'password has changed successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const SendResetEmailHandler = async (
    req: Request<{}, {}, ResetPasswordInterface['body']>,
    res: Response
) => {
    try {
        const email = req.body.email;
        const id = req.body.id;

        const existingUser = await findUser({ email });

        if (!existingUser) {
            res.status(403).json({ message: 'there is no account associated with this email' });
            return;
        }

        const HashName = `resetpassword:${existingUser._id}`;

        const lastEmail = await checkHash(`${HashName}:lastemail`, 'content');

        const existingToken = await checkHash(`${HashName}:token`, 'token');

        if (lastEmail) {
            res.status(400).json({
                message: "can't reset password right now",
            });
            return;
        }

        if (existingToken) {
            res.status(400).json({
                message: 'email already sent',
            });
            return;
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
            link = `${FRONTEND_URL}reset/${token}`;
        } else {
            link = `${FRONTEND_URL}dashboard/settings/setting/reset/${token}`;
        }
        await sendEmail({
            to: existingUser.email,
            templateName: 'passwordreset.hbs',
            link,
        });

        const content = {
            content: addHours(new Date(), 2).toISOString(),
        };

        await createHash({
            HashName: `${HashName}:token`,
            content: { token },
            expire: parseInt(DFTOKENTTL as string),
        });

        await createHash({
            HashName: `${HashName}:lastemail`,
            content: content,
            expire: parseInt(DFTOKENTTL as string) * 3,
        });

        res.status(200).json({ message: 'email sent successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const CheckTokenHandler = async (
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

        const existingUser = await findUser({ _id: user._id });

        if (!existingUser) {
            res.status(403).json({ message: 'forbidden' });
            return;
        }

        const HashName = user.HashName;

        const existingToken = await checkHash(`${HashName}:token`, 'token');

        if ((existingToken && token != existingToken) || !existingToken) {
            res.status(404).json({ message: 'invalid token', state: false });
            return;
        }
        res.status(200).json({ message: 'valid token', state: true });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const ResetPasswordHandler = async (
    req: Request<ResetPasswordNewInterface['params'], {}, ResetPasswordNewInterface['body']>,
    res: Response
) => {
    try {
        const token = req.params.token;

        const { decoded, valid } = await verifyJwt(token, 'VerTokenPrivateKey', 'HS512');

        if (!valid) {
            res.status(403).json({ message: 'invalid token' });
            return;
        }

        const user = decoded as UserDocument;
        const existingUser = await findUser({ _id: user._id });

        if (!existingUser) {
            res.status(403).json({ message: 'forbidden' });
            return;
        }

        const HashName = `resetpassword:${existingUser._id}:token`;

        const existingToken = await checkHash(HashName, 'token');

        if (!existingToken) {
            res.status(404).json({ message: 'invalid token', state: false });
            return;
        }

        const hashedPassword = await hashPassword({
            password: req.body.newPassword,
        });

        await updateUser(
            { email: existingUser.email },
            { password: hashedPassword, passwordUpdatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        await DelHash(HashName, 'token');
        res.status(200).json({ message: 'password has changed successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const SendChangeEmailHandler = async (
    req: Request<ChangeEmailInterface['params'], {}, ChangeEmailInterface['body']>,
    res: Response
) => {
    try {
        const id = req.params.id;
        const newEmail = req.body.email;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'invalid id provided' });
            return;
        }
        const existingUser = await findUser({ _id: id });
        const userWithEmail = await findUser({ email: newEmail });

        if (!existingUser || !id || existingUser.email === newEmail || userWithEmail) {
            res.status(403).json({ message: "can't make changes" });
            return;
        }

        const HashName = `newEmail:${existingUser._id}`;

        const lastEmail = await checkHash(`${HashName}:lastemail`, 'content');

        const existingOtp = await checkHash(`${HashName}:otp`, 'otp');

        const existingToken = await checkHash(`${HashName}:token`, 'token');

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

            const sent = await sendEmail({
                to: newEmail,
                templateName: 'changeEmail.hbs',
                otp,
                health: 'healthcare',
                year: new Date().getFullYear(),
            });
            return { otp, token, sent };
        };

        if (existingToken) {
            if (existingOtp) {
                res.status(400).json({ message: 'email already sent' });
                return;
            }
            const { otp } = await repeatStepOne({ existedToken: true });

            await createHash({
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
            res.status(400).json({ message: "can't change email right now" });
            return;
        }

        const { otp, token } = await repeatStepOne({ existedToken: false });

        await createHash({
            HashName: `${HashName}:otp`,
            content: { otp },
            expire: parseInt(OTPTTL as string),
        });

        await createHash({
            HashName: `${HashName}:token`,
            content: { token: token },
            expire: parseInt(DFTOKENTTL as string),
        });

        res.status(200).json({
            message: 'verification email sent',
            token: token || existingToken,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const checkOtpEmailChangeHandler = async (
    req: Request<CheckOtpInterface['params'], {}, CheckOtpInterface['body']>,
    res: Response
) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'invalid id provided' });
            return;
        }

        const existingUser = await findUser({ _id: id });

        if (!existingUser) {
            res.status(403).json({ message: 'forbidden' });
            return;
        }
        const HashName = `newEmail:${existingUser._id}`;
        const existingOtp = await checkHash(`${HashName}:otp`, 'otp');

        const token = await checkHash(`${HashName}:token`, 'token');

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

        await updateUser(
            {
                _id: user._id,
            },
            { email: user.email },
            { new: true, runValidators: true }
        );

        await createHash({
            HashName: `${HashName}:lastemail`,
            content: { content: addHours(new Date(), 2).toISOString() },
            expire: parseInt(REFRESHTOKENTTL as string),
        });

        await DelHash(`${HashName}:otp`, 'otp');
        await DelHash(`${HashName}:token`, 'token');

        res.status(201).json({ message: 'email has changed successfully', state: true });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const changeProfilePictureHandler = async (
    req: Request<ChangeProfilePictureInterface['params']>,
    res: Response
) => {
    try {
        const id = req.params.id;

        const image = req.file as Express.Multer.File;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'invalid id provided' });
            return;
        }

        const existingUser = await findUser({ _id: id });

        if (!existingUser) {
            res.status(403).json({ message: 'forbidden' });
            return;
        }
        const HashName = `profilePicture:${existingUser._id}:change`;

        const lastTimeChanged = await checkHash(HashName, 'content');

        if (lastTimeChanged) {
            res.status(400).json({ message: "can't change profile picture right now" });
            return;
        }

        const profileImg = await uploadImageToFirebase({
            image,
            path: 'doctors',
            userId: existingUser._id as string,
        });

        const update = await updateUser(
            { _id: id },
            { profileImg },
            { new: true, runValidators: true }
        );
        if (!update) {
            res.status(404).json({
                message: 'something went wrong while changing the profile picture',
            });
            return;
        }

        const content = addHours(update.profileImg?.uploadedAt as Date, 2).toISOString();

        await createHash({
            HashName,
            content: { content },
            expire: parseInt(DFTOKENTTL as string) * 24 * 3,
        });
        res.status(201).json({ message: 'profile picture updated successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error });
    }
};

export const reIssueAccessTokenHandler = async (req: Request, res: Response) => {
    try {
        const refreshToken = get(req, 'headers.x-refresh') as string;
        const temporalToken = get(req, 'headers.x-temporal-token') as string;

        if (temporalToken) {
            const { decoded, valid } = await verifyJwt(temporalToken, `MULTI_AUTH_SECRET`, 'HS512');

            if (!valid) {
                res.status(403).json({ message: 'invalid temporal token', sessionState: false });
                return;
            }
            const user = decoded as UserDocument;

            const existingUser = await findUser({ _id: user._id });
            if (!existingUser) {
                res.status(403).json({ message: 'forbidden', sessionState: false });
                return;
            }
            const obj = {
                user: user._id as string,
                userAgent: req.get('user-agent') || '',
                role: user.role,
            };
            const session = await createSession({ ...obj });

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

        const accessToken = await reIssueAccessToken(refreshToken);

        if (!accessToken) {
            res.status(403).json({ message: 'session has expired', sessionState: false });
            return;
        }

        if (accessToken) {
            res.setHeader('Authorization', `${accessToken}`);
        }

        res.status(200).json({ accessToken, refreshToken, sessionState: true });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const multiAuthOtpHandler = async (
    req: Request<SendEmailVerificationInterface['params']>, // why use? containing only id params
    res: Response
) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'invalid id provided' });
            return;
        }

        const existingUser = await findUser({ _id: id });

        if (!existingUser) {
            res.status(403).json({ message: 'forbidden' });
            return;
        }
        const mulitAuth = existingUser.mfa_state;

        if (mulitAuth) {
            const disabledMulti = await updateUser(
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

        const lastOtp = await checkHash(`${HashName}:otp`, 'otp');

        if (lastOtp) {
            res.status(400).json({ message: 'otp has already sent in less than 5 mins' });
            return;
        }
        const otp = generateOtp({ length: 8, type: 'string' });

        const existedToken = await checkHash(`${HashName}:token`, 'token');

        if (existedToken) {
            const link = `${FRONTEND_URL}dashboard/settings/setting/verify/${existedToken}`;

            await createHash({
                HashName: `${HashName}:otp`,
                content: { otp },
                expire: parseInt(OTPTTL as string),
            });

            await sendEmail({
                to: existingUser.email,
                templateName: 'multiAuth.hbs',
                link,
                otp,
                health: 'healthcare',
                year: new Date().getFullYear(),
            });

            const TTL = await GetHashExpiration(`${HashName}:otp`);

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

        const link = `${FRONTEND_URL}dashboard/settings/setting/verify/${token}`;

        await createHash({
            HashName: `${HashName}:otp`,
            content: { otp },
            expire: parseInt(OTPTTL as string),
        });

        await createHash({
            HashName: `${HashName}:token`,
            content: { token },
            expire: parseInt(DFTOKENTTL as string),
        });

        await sendEmail({
            to: existingUser.email,
            templateName: 'multiAuth.hbs',
            link,
            otp,
            health: 'healthcare',
            year: new Date().getFullYear(),
        });

        const TTL = await GetHashExpiration(`${HashName}:otp`);

        res.status(201).json({
            message: 'A verification link with otp has sent to your email',
            token,
            TTL,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyEnablingMultiAuthOtpHandler = async (
    req: Request<CheckOtpInterface['params'], {}, CheckOtpInterface['body']>,
    res: Response
) => {
    try {
        const id = req.params.id;

        const otp = req.body.otp;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'invalid id provided' });
            return;
        }

        const existingUser = await findUser({ _id: id });

        if (!existingUser) {
            res.status(403).json({ message: 'forbidden' });
            return;
        }

        const HashName = `multi-auth-enabling:${existingUser._id}`;

        const existedToken = await checkHash(`${HashName}:token`, 'token');

        if (!existedToken) {
            res.status(400).json({ message: 'token has expired', state: false });
            return;
        }

        const validOtp = await checkHash(`${HashName}:otp`, 'otp');

        if (!validOtp || otp !== validOtp) {
            res.status(400).json({ message: 'otp has expired', state: false });
            return;
        }

        await updateUser(
            { _id: existingUser._id },
            { mfa_state: true },
            { runValidators: true, new: true }
        );

        await DelHash(`${HashName}:otp`, 'otp');

        await DelHash(`${HashName}:token`, 'token');

        const currDate = new Date();

        await sendEmail({
            to: existingUser.email,
            templateName: 'mfaEnabled.hbs',
            date: addHours(currDate, 2).toISOString(),
            health: 'healthcare',
            year: new Date().getFullYear(),
        });

        res.status(200).json({
            message: 'mulit-factor authentication has been enabled',
            state: true,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// test handler only for deleting unverified users
// This should be run manually or scheduled using a cron job
// It is not recommended to use this in production without proper checks

export const deleteUnVerifiedUsersHandler = async (req: Request, res: Response) => {
    try {
        const unverified = await getAllUsers({ verified: false });

        if (!unverified || unverified.length < 1) {
            res.status(404).json({ message: 'no unverified users found' });
            return;
        }

        for (let user of unverified) {
            const HashName = `emailVerificationAlert:${user._id}`;

            const lastEmail = await checkHash(HashName, 'lastemail');

            if (!lastEmail) {
                res.status(403).json({ message: 'User is still within the warning phase' });
                return;
            }

            await sendEmail({
                to: user.email,
                templateName: 'emailDeletion.hbs',
                health: 'healthcare',
                year: new Date().getFullYear(),
            });

            await deleteImage(user.profileImg?.path);

            await deleteCode({ user: user._id });

            await deleteUser({ _id: user._id });

            await DelHash(HashName, 'lastemail');
        }
        res.status(200).json({ message: 'unverified users deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
