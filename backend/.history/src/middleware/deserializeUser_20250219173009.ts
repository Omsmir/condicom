import { NextFunction, Request, Response } from "express";
import { get } from "lodash";

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

      const refreshToken = get(req,'')
  } catch (error) {}
};
