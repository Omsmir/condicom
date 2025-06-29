import { get } from 'lodash';
import { sessionDocument, sessionInput, SessionModel } from '../models/session.model';
import { signJwt, verifyJwt } from '../utils/jwt.sign';
import { findUser } from './user.service';
import { ACCESSTOKENTTL } from 'config';
import { FilterQuery, QueryOptions } from 'mongoose';
import { findCode } from './code.service';
export const createSession = async (input: sessionInput) => {
    return await SessionModel.create(input);
};

export const getSession = async (query: FilterQuery<sessionDocument>) => {
    return await SessionModel.findOne(query).lean();
};

export const updateSession = async (
    query: FilterQuery<sessionDocument>,
    update: Partial<sessionDocument>,
    options?: QueryOptions
) => {
    return await SessionModel.findOneAndUpdate(query, update, options);
};

export const reIssueAccessToken = async (refreshToken: string) => {
    const { decoded } = await verifyJwt(refreshToken, 'refreshTokenPublicKey', 'RS256');

    if (!decoded || !get(decoded, 'session')) return false;

    const session = await SessionModel.findById(get(decoded, 'session'));

    if (!session || !session.valid) return false;

    const user = await findUser({ _id: session.user });

    if (!user) return false;

    const code = await findCode({ user: user._id });
    const accessToken = signJwt(
        { ...user, session: session?._id, codePlan: code?.expiration },
        'accessTokenPrivateKey',
        'RS256',
        { expiresIn: parseInt(ACCESSTOKENTTL as string) }
    );

    return accessToken;
};
