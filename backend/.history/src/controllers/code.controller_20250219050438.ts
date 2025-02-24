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

    const existingCode = await findCode({code})

    if(existingCode){
         res.status(409).json({ message: "Code already exists" });
         return
    }

  } catch (error) {}
};
