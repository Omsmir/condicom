import { NextFunction, Request, Response } from "express";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.get("headers.authroz")
  } catch (error) {}
};
