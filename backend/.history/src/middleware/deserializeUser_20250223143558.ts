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

      const refreshToken =  req.cookies.refreshToken


      if(!accessToken){
        return next()
      }



      const {decoded,valid} = await verifyJwt(accessToken,'accessTokenPublicKey')

      console.log(decoded,valid)
      if(decoded && !valid){
        res.locals.user = decoded

        console.log(decoded ? decoded : null)
        return next()
      }


      if(!valid && refreshToken){

        const newAccessToken = await reIssueAccessToken(refreshToken) 

        if(newAccessToken){
            res.setHeader('x-access-token',newAccessToken)
        }

        const {decoded} = await verifyJwt(newAccessToken as string,'accessTokenPublicKey')

        res.locals.user = decoded

        return  next()
    }

     
    

    return next()

};
