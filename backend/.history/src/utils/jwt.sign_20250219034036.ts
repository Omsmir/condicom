import { Jwt } from "jsonwebtoken";

interface signJwtProps {
    object:Object,
    keyNameIdentifier: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: J
}

export const signJwt = async () => {

}