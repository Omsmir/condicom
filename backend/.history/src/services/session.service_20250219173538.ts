import { get } from "lodash";
import { sessionInput, SessionModel } from "../models/session.model";
import { verifyJwt } from "../utils/jwt.sign";

export const createSession = async (input:sessionInput) => {
    return await SessionModel.create(input)
}



export const reIssueAccessToken = async(refreshToken:string) => {
    const {decoded} = await verifyJwt({token:refreshToken,keyNameIdentifier:"refreshTokenPublicKey"})

    if(!decoded || !get(decoded,'session')) return false
}