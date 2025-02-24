import { NextFunction, Request, Response } from "express";
import { SessionSchemaInterface } from "../schemas/session.schema";

export const login = async (
  req: Request<{}, {}, SessionSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {}
};
