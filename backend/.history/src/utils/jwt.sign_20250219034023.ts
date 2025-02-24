import { Jwt } from "jsonwebtoken";

interface signJwtProps {
    object:Object,
    keyNameIdentifier: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    
}

export const signJwt = async () => {

}