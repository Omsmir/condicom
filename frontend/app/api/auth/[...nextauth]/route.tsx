import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';
import { addHours } from 'date-fns';
import { refreshAccessToken } from '@/actions/User';

const axiosInstace = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/api/auth/',
});

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async credentials => {
                try {
                    const response = await axiosInstace.post(`/login`, {
                        email: credentials?.email,
                        password: credentials?.password,
                    });

                    const { accessToken, refreshToken, mfa_state, temporalToken } =
                        await response.data;

                    if (mfa_state && !accessToken && temporalToken) {
                        const decodedToken = jwt.decode(temporalToken) as JwtPayload;

                        return {
                            id: decodedToken._id,
                            role: decodedToken.role,
                            mfa_state: decodedToken.mfa_state || false,
                            profileState: decodedToken.profileState,
                            isFullyAuthenicated: decodedToken.isFullyAuthenicated,
                            isPartiallyAuthenicated: decodedToken.isPartiallyAuthenicated,
                            temporalToken,
                        };
                    } else if (accessToken) {
                        // Decode the JWT token
                        const decodedToken = jwt.decode(accessToken) as JwtPayload;
                        return {
                            email: credentials?.email,
                            id: decodedToken.id,
                            role: decodedToken.role,
                            name: decodedToken.name,
                            profileImg: decodedToken.profileImg,
                            verified: decodedToken.verified,
                            expiresAt: decodedToken.exp && decodedToken.exp * 1000,
                            code: decodedToken.code,
                            profileState: decodedToken.profileState,
                            passwordUpdatedAt: decodedToken.passwordUpdatedAt,
                            codeExp: decodedToken.codePlan,
                            mfa_state: decodedToken.mfa_state,
                            isFullyAuthenicated: decodedToken.isFullyAuthenicated,
                            isPartiallyAuthenicated: decodedToken.isPartiallyAuthenicated,
                            accessToken,
                            refreshToken,
                        };
                    } else {
                        return null;
                    }
                } catch (error: any) {
                    if (axios.isAxiosError(error)) {
                        if (error.response) {
                            const { status, data } = error.response;
                            if (status !== 200) throw new Error(data.message);
                        }
                    }

                    throw new Error('Unable to connect to the server.');
                }
            },
        }),
    ],
    callbacks: {
        async jwt({
            token,
            user,
            trigger,
        }: {
            token: JWT;
            user: any;
            trigger?: 'signIn' | 'update' | 'signUp' | 'mfa';
        }) {
            if (
                user &&
                user.mfa_state &&
                !user.isFullyAuthenicated &&
                user.isPartiallyAuthenicated
            ) {
                token.id = user.id;
                token.role = user.role;
                token.mfa_state = user.mfa_state;
                token.profileState = user.profileState;
                token.temporalToken = user.temporalToken;
                token.isFullyAuthenicated = user.isFullyAuthenicated;
                token.isPartiallyAuthenicated = user.isPartiallyAuthenicated;
            } else if (user) {
                token.id = user.id;
                token.role = user.role;
                token.name = user.name;
                token.token = user.token;
                token.profileImg = user.profileImg?.url || null;
                token.verified = user.verified;
                token.code = user.code;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.expiresAt = user.expiresAt;
                token.profileState = user.profileState;
                token.passwordUpdatedAt = user.passwordUpdatedAt;
                token.codeExp = user.codeExp;
                token.mfa_state = user.mfa_state;
                token.isFullyAuthenicated = user.isFullyAuthenicated;
                token.isPartiallyAuthenicated = user.isPartiallyAuthenicated;
            }

            if (trigger === 'update' && !token.profileState) {
                token.profileState = true;
            }
            if (trigger === 'update' && token.temporalToken && token.isPartiallyAuthenicated) {
                return await refreshAccessToken({
                    token: token.temporalToken as string,
                    headerName: 'x-temporal-token',
                });
            }

            if (trigger === 'update') {
                return await refreshAccessToken({
                    token: token.refreshToken as string,
                    headerName: 'x-refresh',
                });
            }

            const tokenExpiration = addHours(new Date(token.expiresAt as number), 2);
            const currDate = addHours(new Date(), 2);

            // console.log(
            //   "Token Expiration:",
            //   new Date(tokenExpiration).getTime() > Date.now()
            // );
            if (currDate > tokenExpiration) {
                return await refreshAccessToken({
                    token: token.refreshToken as string,
                    headerName: 'x-refresh',
                });
            }

            return token;
        },
        async session({ session, token }) {
            if (
                token &&
                token.mfa_state &&
                !token.isFullyAuthenicated &&
                token.isPartiallyAuthenicated
            ) {
                session.user = {
                    id: token.id,
                    role: token.role,
                    mfa_state: token.mfa_state,
                    profileState: token.profileState,
                    temporalToken: token.temporalToken,
                    isFullyAuthenicated: token.isFullyAuthenicated,
                    isPartiallyAuthenicated: token.isPartiallyAuthenicated,
                };
            } else if (token) {
                session.user = {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                    email: token.email,
                    image: (token?.profileImg as string) || null,
                    name: token.name,
                    verified: token.verified,
                    code: token.code,
                    accessToken: token.accessToken,
                    profileState: token.profileState,
                    refreshToken: token.refreshToken,
                    passwordUpdatedAt: token.passwordUpdatedAt,
                    codeExp: token.codeExp,
                    mfa_state: token.mfa_state,
                    isFullyAuthenicated: token.isFullyAuthenicated,
                    isPartiallyAuthenicated: token.isPartiallyAuthenicated,
                };
                // console.log(new Date().toLocaleString());
                session.expires = new Date(token.expiresAt as number).toLocaleString();
            }
            // console.log("Session:", session);
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// Correctly export as HTTP methods
export { handler as GET, handler as POST };
