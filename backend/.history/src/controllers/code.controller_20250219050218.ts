import { NextFunction, Request, Response } from "express";
import { codeSchemaInterface } from "../schemas/code.schema";
import { generateCode } from "../utils/backevents";

export const createCodeHandler = async (
  req: Request<{}, {}, codeSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = generateCode({...req.body})

    const role = 
  } catch (error) {}
};
