import { NextFunction, Request, Response } from "express";
import z, { AnyZodObject } from "zod";

export const validate = (Schema:AnyZodObject) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Schema.parse({
        body:req
    })
  } catch (error) {}
};
