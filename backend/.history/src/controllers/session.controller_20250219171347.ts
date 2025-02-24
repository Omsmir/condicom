import { NextFunction, Request, Response } from "express";
import { SessionSchemaInterface } from "../schemas/session.schema";
import { validatePassword } from "../services/user.service";

export const login = async (
  req: Request<{}, {}, SessionSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = validatePassword({...req.body})

    if(!user){

    }
  } catch (error) {

  }
};
