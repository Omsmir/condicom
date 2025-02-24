import { NextFunction, Request, Response } from "express";
import {
  AddAdditionalInterface,
  CreateUserInterface,
} from "../schemas/user.schema";
import { uploadImageToFirebase } from "../utils/getPresignedUrl";
import { createUser, findUser, updateUser } from "../services/user.service";
import { findCode } from "../services/code.service";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInterface["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Request Body:", req.body);

    const email = req.body.email;
    const code = req.body.code;

    // Check if the user already exists
    const existingUser = await findUser({ email });

    if (existingUser) {
       res.status(403).json({ message: "User already exists" });
       return
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

    preCode.used = true;
    await preCode.save();

    // Create the user
    const user = await createUser({ ...req.body, role: preCode.role });

    return res.status(201).json({
      message: "User registered successfully",
      user,
      timestamp: new Date().toISOString(), // ✅ Helps detect duplicate requests
    });
  } catch (error: any) {
    console.error("Error in createUserHandler:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const AddAdditionlHandler = async (
  req: Request<
    AddAdditionalInterface["params"],
    {},
    AddAdditionalInterface["body"]
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const existingUser = await findUser({ _id: id });

    if (!existingUser) {
      res.status(404).json({ message: "user doesn't exist" });
      return;
    }
    const image = req.file as Express.Multer.File;

    const profileImg = await uploadImageToFirebase({ image });

    const updatedUser = await updateUser(
      { _id: id },
      { ...req.body, profileImg: profileImg },
      { new: true, runValidators: true }
    );

    res
      .status(203)
      .json({ message: "information added successfully", updatedUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
