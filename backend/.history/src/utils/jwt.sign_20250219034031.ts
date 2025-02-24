import { Jwt } from "jsonwebtoken";

interface signJwtProps {
    object:Object,
    keyNameIdentifier: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: jwt
}

export const signJwt = async () => {

}