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

    // Check if the user already exists
    const existingUser = await findUser({ email });
    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }

    // Check if the code has already been used
    const usedCode = await findUser({ code });
    if (usedCode) {
      return res.status(409).json({ message: "This Code is Used" });
    }

    // Check if the code exists
    const preCode = await findCode({ code });
    if (!preCode) {
      return res.status(404).json({ message: "Invalid Code Provided" });
    }

    // Mark the code as used
    preCode.used = true;

    // Create user
    const user = await createUser({ ...req.body, role: preCode.role });

    return res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    console.error("Error in createUserHandler:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
