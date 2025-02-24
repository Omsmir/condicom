import { NextFunction, Request, Response } from "express";
import { codeSchemaInterface } from "../schemas/code.schema";
import { generateCode, signRole } from "../utils/backevents";
import { findCode } from "../services/code.service";

export const createCodeHandler = async (
  req: Request<{}, {}, codeSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = generateCode({...req.body})

    const role = signRole(code)


    const existingCode = await findCode({code})

  } catch (error) {}
};
