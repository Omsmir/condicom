import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.sign";

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

      const {} = verifyJwt({token:accessToken,})
  } catch (error) {}
};
