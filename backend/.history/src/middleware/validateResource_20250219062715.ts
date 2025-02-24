import { NextFunction, Request, Response } from "express";
import z, { AnyZodObject, ZodError } from "zod";

export const validate = (Schema:AnyZodObject) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Schema.parse({
        body:req.body,
        params:req.params,
        query:req.query,
        file: req.file ? { profileImg: req.file } : undefined,
    })
    next()
  } catch (e:any) {
    if(e instanceof ZodError){
        res.status(400).json({message:e.errors});
    }else {
        res.status(500).json({message:e.message})
    }
  }
};


