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
      return;
    }

    // Check if the code has already been used
    const usedCode = await findUser({ code });

    if (usedCode) {
      res.status(409).json({ message: "This Code is Used" });
      return;
    }

    // Check if the code exists
    const preCode = await findCode({ code });

    if (!preCode) {
      res.status(404).json({ message: "Invalid Code Provided" });
      return;
    }

    preCode.used = true;
    await preCode.save();

    // Create the user
    const user = await createUser({ ...req.body, role: preCode.role });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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

    const profileImg = await uploadImageToFirebase({
      image,
      path: "doctors",
      userId: existingUser._id as string,
    });

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

export const getUser = async (
  req: Request<AddAdditionalInterface["params"], {}>,
  res: Response
) => {
  try {
    const user = await findUser({_id:})
  } catch (error) {}
};
