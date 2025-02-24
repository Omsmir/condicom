import { NextFunction, Request, Response } from "express";
import { CreateUserInterface } from "../schemas/user.schema";
import { uploadImageToFirebase } from "../utils/getPresignedUrl";
import { createUser, findUser } from "../services/user.service";
import { codeSchemaInterface } from "../schemas/code.schema";

export const createCodeHandler = async (
  req: Request<{}, {}, codeSchemaInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {}
};
