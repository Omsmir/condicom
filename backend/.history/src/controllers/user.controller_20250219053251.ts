import { NextFunction, Request, Response } from "express";
import { CreateUserInterface } from "../schemas/user.schema";
import { uploadImageToFirebase } from "../utils/getPresignedUrl";
import { createUser, findUser } from "../services/user.service";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;

    const code = req.body.code
    const existingUser = await findUser({ email: email });

    if (existingUser) {
      res.status(403).json({ message: "user already exists" });
      return;
    }

    const user = await createUser(req.body);

    res.status(201).json({ message: "user registered successfully" ,user});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};
