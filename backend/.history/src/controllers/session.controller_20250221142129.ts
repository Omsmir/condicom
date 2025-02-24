import { NextFunction, Request, Response } from "express";
import { SessionSchemaInterface } from "../schemas/session.schema";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.sign";
import { createSession, getSession } from "../services/session.service";
import config from "config";
export const login = async (
  req: Request<{}, {}, SessionSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await validatePassword(req.body);

    if (!user) {
      res.status(403).json({ message: "invalid email or password" });
      return;
    }

  
    const obj = {
      user: user._id as string,
      userAgent: req.get("user-agent") || "",
      role: user.role,
    };



    const session = await createSession({ ...obj });

    const accessToken = await signJwt(
      { ...user,id:user._id, session: session._id },
      "accessTokenPrivateKey",
      { expiresIn: config.get("accessTokenTtl") }
    );

    const refreshToken = await signJwt(
        { ...user, session: session._id },
        "refreshTokenPrivateKey",
        { expiresIn: config.get("refreshTokenTtl") }
      );


      res.cookie()
      res.status(200).json({message:"logged in successfully",accessToken,refreshToken})
  } catch (error:any) {
    res.status(500).json({message:error.message})
  }
};



export const getUserSessions = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id;

    const sessions = await getSession({ user: userId, valid: true });

     res.status(200).json({ sessions });
  } catch (error: any) {
     res.status(500).json({ message: error.message });
  }
};
