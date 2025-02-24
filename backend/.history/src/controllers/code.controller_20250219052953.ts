import { NextFunction, Request, Response } from "express";
import { codeSchemaInterface } from "../schemas/code.schema";
import { generateCode, role, signRole } from "../utils/backevents";
import { createCode, findCode } from "../services/code.service";

export const createCodeHandler = async (
  req: Request<{}, {}, codeSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {

    const numbers = [req.body.numbers]
    const fiveNumbers = [req.body.fiveNumbers]
    const code = generateCode({...req.body})

    const existingCode = await findCode({code})

    if(existingCode){
         res.status(409).json({ message: "Code already exists" });
         return
    }
    const role = signRole(code)


    const newCode = await createCode({role:role  ,code})

    res.status(201).json({message:'code generated successfully',code:newCode})

  } catch (error:any) {
    res.status(500).json({message:error.message})
  }
};
