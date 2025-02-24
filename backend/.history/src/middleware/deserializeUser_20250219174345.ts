import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.sign";
import { reIssueAccessToken } from "../services/session.service";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = get(req,"headers.authorization",'')?.replace(
        /^Bearer\s/,
        ""
      );

      const refreshToken =  get(req, "headers.x-refresh") as string

      if(!accessToken){
        return next()
      }

      const {decoded,expired,valid} = await verifyJwt(accessToken,'accessTokenPublicKey')

      if(decoded){
        res.locals.user = decoded
        return next()
      }

      if(expired && refreshToken){

        const newAccessToken = await reIssueAccessToken(refreshToken) 

        if(newAccessToken){
            res.setHeader('x-access-token',newAccessToken)
        }

        const {decoded} = await verifyJwt(newAccessToken as string,'accessTokenPublicKey')

        res.locals.user = decoded

        return  next()
    }

    return next()
  } catch (error) {
    return res.status
  }
};
