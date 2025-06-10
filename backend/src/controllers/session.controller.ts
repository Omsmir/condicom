import { NextFunction, Request, Response } from 'express';
import { SessionSchemaInterface } from '../schemas/session.schema';
import { validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt.sign';
import { createSession, getSession } from '../services/session.service';
import { ACCESSTOKENTTL, REFRESHTOKENTTL } from 'config';
import { findCode } from '../services/code.service';
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

        const session = await createSession({ ...obj });

        if (user.mfa_state) {
        }

        const accessToken = await signJwt(
            {
                ...user,
                id: user._id,
                session: session._id,
                codePlan: code.expiration,
            },
            'accessTokenPrivateKey',
            'RS256',
            { expiresIn: ACCESSTOKENTTL as any }
        );

        const refreshToken = await signJwt(
            { ...user, session: session._id, codePlan: code.expiration },
            'refreshTokenPrivateKey',
            'RS256',
            { expiresIn: REFRESHTOKENTTL as any }
        );

        // res.cookie("refreshToken",refreshToken,{
        //   httpOnly:true,
        //   path:"/",
        //   sameSite:"lax",
        //   secure:config.get<string>("nodeEnv") === 'production'
        // })
        res.status(200).json({ message: 'logged in successfully ', accessToken, refreshToken });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
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
