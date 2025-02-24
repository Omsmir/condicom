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
    const user = validatePassword(req.body)

    if(!user){
        res.status(403).json({message:"invalid email or password"})
        return
    }

    const session = await createSession({user: user.})
    const accessToken  = await signJwt({...user,session:})
  } catch (error) {

  }
};
