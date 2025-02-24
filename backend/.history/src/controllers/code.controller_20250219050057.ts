import { NextFunction, Request, Response } from "express";
import { codeSchemaInterface } from "../schemas/code.schema";

export const createCodeHandler = async (
  req: Request<{}, {}, codeSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = ge
  } catch (error) {}
};
