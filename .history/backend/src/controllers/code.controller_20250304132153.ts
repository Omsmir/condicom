import { NextFunction, Request, Response } from "express";
import { codeSchemaInterface } from "../schemas/code.schema";
import { generateCode, role, signRole } from "../utils/backevents";
import { createCode, findCode } from "../services/code.service";
import { findUser } from "../services/user.service";

export const createCodeHandler = async (
  req: Request<codeSchemaInterface["params"], {}, codeSchemaInterface["body"]>,
  res: Response
) => {
  try {

    const id  = req.params.id

    const existingAdminUser = await findUser({_id:id,role:"Admin"})

    if(!existingAdminUser || !id){
      res.status(403).json({message:"forbidden"})
      return
    }
    const numbers = [req.body.numbers]
    const fiveNumbers = [req.body.fiveNumbers]
    const characters = [req.body.characters]

    const obj = {
        numbers,
        fiveNumbers,
        characters
    }
    const code = generateCode({...obj})

    const existingCode = await findCode({code})

    if(existingCode){
         res.status(409).json({ message: "Code already exists" });
         return
    }
    const role = signRole(code)

    
    if(!role){
      res.status(400).json({message:"Not Supported Yet"})
      return
    }

    const expiration = gene

    const newCode = await createCode({role:role  ,code,user:existingAdminUser._id})

    res.status(201).json({message:`${newCode.role} code generated successfully`,code:newCode})

  } catch (error:any) {
    res.status(500).json({message:error.message})
  }
};
