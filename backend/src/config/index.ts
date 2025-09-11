import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
    NODE_ENV,
    PORT,
    MONGO_DB_URI,
    FRONTEND_URI_DEV,
    APP_PASSWORD,
    SMTP_USER,
    MONGO_AUTH_USER,
    MONGO_PASSWD,
    MONGO_MAIN_DATABASE,
    ACCESS_TOKEN_PUBLIC_KEY,
    VERIFICATION_TOKEN_PRIVATE,
    ACCESS_TOKEN_PRIVATE_KEY,
    REFRESH_PRIVATE_KEY,
    REFRESH_PUBLIC_KEY,
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MESURMENTID,
    REDIS_PWD,
    REDIS_DEV_URI,
    SALTWORKFACTOR,
    ACCESSTOKENTTL,
    REFRESHTOKENTTL,
    LOG_FORMAT,
    LOG_DIR,
    ORIGIN,
    TEMPORALTOKENTTL,
    DFTOKENTTL,
    OTPTTL,
    BODYSIZELIMIT,
    PROJECT_NAME
} = process.env;

export const CREDENTIALS = process.env.CREDENTIALS === `true`;

export default {
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
    refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY,
    VerTokenPrivateKey: process.env.VERIFICATION_TOKEN_PRIVATE,
    MULTI_AUTH_SECRET: process.env.MULTI_AUTH_SECRET,
};
