import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.sign";
import { reIssueAccessToken } from "../services/session.service";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 
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

        console.log(new Date(res.locals.user.exp as number).toISOString())
        return next()
      }

    

    return next()

};
