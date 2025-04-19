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

      const refreshToken =  get(req,"headers.x-refresh") as string


      if(!accessToken){
        return next()
      }



      const {decoded,valid} = await verifyJwt(accessToken,'accessTokenPublicKey',"RS256")

      if(decoded){
        res.locals.user = decoded

        console.log("Decoded User: from access token deserialize ")
        return next()
      }



      if(!valid && refreshToken){

        const newAccessToken = await reIssueAccessToken(refreshToken) 

        if(newAccessToken){
            res.setHeader('Authorization',`${newAccessToken}`)
        }

        const {decoded} = await verifyJwt(newAccessToken as string,'accessTokenPublicKey',"RS256")

        res.locals.user = decoded

        return  next()
    }


    return next()

};
