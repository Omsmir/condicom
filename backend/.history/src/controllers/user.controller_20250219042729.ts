import { NextFunction, Request, Response } from "express";
import { CreateUserInterface } from "../schemas/user.schema";
import { uploadImageToFirebase } from "../utils/getPresignedUrl";
import { createUser } from "../services/user.service";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const image = req.file as Express.Multer.File;

    const email = req.body.email

    const exiting
    const profileImg = await uploadImageToFirebase({ image });

    const user = await createUser({ ...req.body, profileImg: profileImg });

    res.status(201).json({ message: "user registered successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};
