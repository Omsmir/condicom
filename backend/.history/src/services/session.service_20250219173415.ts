import { sessionInput, SessionModel } from "../models/session.model";

export const createSession = async (input:sessionInput) => {
    return await SessionModel.create(input)
}



export const reIssueAccessToken = async(refreshToken:string) => {

}