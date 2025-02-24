import { Jwt } from "jsonwebtoken";

interface signJwtProps {
    object:Object,
    keyNameIdentifier: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options
}

export const signJwt = async () => {

}