import { get } from "lodash";
import { sessionInput, SessionModel } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.sign";
import { findUser } from "./user.service";
import config from 'config'
export const createSession = async (input:sessionInput) => {
    return await SessionModel.create(input)
}



export const reIssueAccessToken = async(refreshToken:string) => {
    const {decoded} = await verifyJwt(refreshToken,"refreshTokenPublicKey")

    if(!decoded || !get(decoded,'session')) return false

    const session = await SessionModel.findById(get(decoded, "session"))

    if(!session || !session.valid) return false

    const user = await findUser({_id:session.user})

    if(!user) return false

    const accessToken =  signJwt(
        { ...user, session: session?._id },
        "accessTokenPrivateKey",
        { expiresIn: config.get("accessTokenTtl") } // 15min
      );
    

      return accessToken
}