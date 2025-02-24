import jwt from "jsonwebtoken";
import config from 'config'


export const signJwt = async (  object:Object,
    keyNameIdentifier: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: jwt.SignOptions | undefined) => {

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
        const publicKey = Buffer.from(config.get<string>(keyNameIdentifier),'base64').toString("ascii")


        const decoded = jwt.verify(token,publicKey)

        return {
            valid:true,
            expired:false,
            decoded
        }
    } catch (error:any) {
        return{
            valid:false,
            expired: error.message = "jwt expired",
            decoded:null
        }
    }
}