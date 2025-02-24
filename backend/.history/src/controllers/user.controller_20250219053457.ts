import { NextFunction, Request, Response } from "express";
import { CreateUserInterface } from "../schemas/user.schema";
import { uploadImageToFirebase } from "../utils/getPresignedUrl";
import { createUser, findUser } from "../services/user.service";
import { findCode } from "../services/code.service";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;

    const code = req.body.code;
    const existingUser = await findUser({ email: email });

    if (existingUser) {
      res.status(403).json({ message: "user already exists" });
      return;
    }

    const InvalidCode = await findCode({ code: code });

    if (!InvalidCode) {
      res.status(404).json({ message: "Invalid Code Supported" });
      return;
    }

    const existingCode = await findUser({ code: code });

    if (existingCode) {
      return res.status(409).json({ message: "This Code is Used" });
    }

    const user = await createUser(req.body);

    res.status(201).json({ message: "user registered successfully", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};
