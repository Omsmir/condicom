import { NextFunction, Request, Response } from "express";
import { SessionSchemaInterface } from "../schemas/session.schema";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.sign";
import { createSession } from "../services/session.service";

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

    const code = user.code
    const id = user._id

    const obj = {
        user:id,
        code,
        userAgent:req.get("user-agent") || ""
        role: user.role
    }

  
    const session = await createSession({user: id, code:code ,userAgent:req.get("user-agent") || ""})
    const accessToken  = await signJwt({...user,session:})
  } catch (error) {

  }
};
