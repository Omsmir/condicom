import { get } from 'lodash';
import { sessionDocument, sessionInput, SessionModel } from '../models/session.model';
import { signJwt, verifyJwt } from '../utils/jwt.sign';
import UserService from './user.service';
import { ACCESSTOKENTTL } from 'config';
import { FilterQuery, QueryOptions } from 'mongoose';

class SessionService {
    private userService: UserService;

    constructor(private sessionModel = SessionModel) {
        this.userService = new UserService();
    }

    public createSession = async (input: sessionInput) => {
        return await this.sessionModel.create(input);
    };

    public getSession = async (query: FilterQuery<sessionDocument>) => {
        return await this.sessionModel.findOne(query).lean();
    };

    public updateSession = async (
        query: FilterQuery<sessionDocument>,
        update: Partial<sessionDocument>,
        options?: QueryOptions
    ) => {
        return await this.sessionModel.findOneAndUpdate(query, update, options);
    };

    public reIssueAccessToken = async (refreshToken: string) => {
        const { decoded } = await verifyJwt(refreshToken, 'refreshTokenPublicKey', 'RS256');

        if (!decoded || !get(decoded, 'session')) return false;

        const session = await this.sessionModel.findById(get(decoded, 'session'));

        if (!session || !session.valid) return false;

        const user = await this.userService.findUser({ _id: session.user });

        if (!user) return false;

        const accessToken = signJwt(
            { ...user, session: session?._id },
            'accessTokenPrivateKey',
            'RS256',
            { expiresIn: parseInt(ACCESSTOKENTTL as string) }
        );

        return accessToken;
    };
}



export default SessionService