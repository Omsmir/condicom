import dotenv from 'dotenv'


dotenv.config()

export default {
    nodeEnv:process.env.NODE_ENV,
    port:8080,
    dbUri:"mongodb://localhost:27017/",
    frontendUri:process.env.NODE_ENV === "development" ? process.env.FRONTEND_URI_DEV : undefined,
    smtpAppPassword:process.env.APP_PASSWORD,
    smtpUser:process.env.SMTP_USER,
    mongoUser:process.env.MONGO_AUTH_USER,
    mongoPasswd:process.env.MONGO_PASSWD,
    mainDB:process.env.MONOG_MAIN_DATABASE,
    saltWorkFactor:10,
    accessTokenTtl:"15m",
    refreshTokenTtl:"1y",
    accessTokenPublicKey:process.env.ACCESS_TOKEN_PUBLIC_KEY,
    VerTokenPrivateKey:process.env.VERIFICATION_TOKEN_PRIVATE,
    accessTokenPrivateKey:process.env.ACCESS_TOKEN_PRIVATE_KEY,
    refreshTokenPrivateKey:process.env.REFRESH_PRIVATE_KEY,
    refreshTokenPublicKey:process.env.REFRESH_PUBLIC_KEY,
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    meID:process.env.FIREBASE_MESURMENTID,
    redisPwd: process.env.REDIS_PWD ,
    redisDevUri: process.env.NODE_ENV === "development" ? process.env.REDIS_DEV_URI : undefined
}