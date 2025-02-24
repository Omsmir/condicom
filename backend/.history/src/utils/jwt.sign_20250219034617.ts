import jwt from "jsonwebtoken";
import config from 'config'
interface signJwtProps {
    object:Object,
    keyNameIdentifier: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: jwt.SignOptions | undefined
}

export const signJwt = async ({object,keyNameIdentifier,options}:signJwtProps) => {

    const signingKey = Buffer.from(config.get<string>(keyNameIdentifier),'base64').toString("ascii")
    return jwt.sign(object,signingKey,{
        ...(options && options),
        algorithm:'RS256'
    })
}


interface verifyJwtProps {
    token:string;
    keyNameIdentifier:'accessTokenPublicKey' | 'refreshTokenPublicKey'
}


export const verifyJwt = async ({token,keyNameIdentifier}:verifyJwtProps) => {
    try {
        const signingKey = Buffer.from(config.get<string>(keyNameIdentifier),'base64').to
    } catch (error) {
        
    }
}