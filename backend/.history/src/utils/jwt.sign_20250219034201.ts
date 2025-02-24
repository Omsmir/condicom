import jwt from "jsonwebtoken";

interface signJwtProps {
    object:Object,
    keyNameIdentifier: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: jwt.SignOptions | undefined
}

export const signJwt = async ({object,keyNameIdentifier,options}:signJwtProps) => {

    const signingKey = Buffer.from(keyNameIdentifier,'base64').toString("")
}