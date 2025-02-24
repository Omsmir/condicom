import { NextFunction, Request, Response } from "express";
import { SessionSchemaInterface } from "../schemas/session.schema";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.sign";
import { createSession } from "../services/session.service";
import config from 'config'
export const login = async (
  req: Request<{}, {}, SessionSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await  validatePassword(req.body)


    if(!user){
        res.status(403).json({message:"invalid email or password"})
        return
    }


    const obj = {
        user:user._id as string,
        code:user.code,
        userAgent:req.get("user-agent") || "",
        role: user.role
    }

  
    const session = await createSession({...obj})


    const accessToken  = await signJwt({...user,session:session._id},'accessTokenPrivateKey',{expiresIn:config.get("accessTokenTtl")})
  } catch (error) {

  }
};
