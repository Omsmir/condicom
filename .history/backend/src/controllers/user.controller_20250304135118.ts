import { NextFunction, Request, Response } from "express";
import {
  AddAdditionalInterface,
  ChangeUserInterface,
  CreateUserInterface,
} from "../schemas/user.schema";
import { uploadImageToFirebase } from "../utils/getPresignedUrl";
import {
  createUser,
  findUser,
  getAllUsers,
  updateUser,
} from "../services/user.service";
import { findCode, updateCode } from "../services/code.service";
import { UserDocument } from "../models/user.model";
import { keyBy } from "lodash";

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

   const code = 

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

    const code = await findCode({ code:existingUser.code });


    if(!code) {
      res.status(403).json({message:"something went wrong with the code"})
      return
    }

    await updateCode({_id:code._id},{user:existingUser._id},{new:true,runValidators:true})

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
    const existingUser = await findUser({ _id: req.params.id });

    if (!existingUser) {
      res.status(404).json({ message: "user doesn't exist" });
    }

    res.status(200).json({ existingUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsersHandler = async (req: Request<ChangeUserInterface['params']>, res: Response) => {
  try {
    const id = req.params.id


    const user = await findUser({_id:id})

    if (!user) {
      res.status(403).json({ message: "forbidden" });
      return;
    }
    const users = await getAllUsers({
      _id: { $ne: user._id },
      role: {
        $nin: [
          "Charge Nurse",
          "Head Nurse",
          "Head Secretary",
          "Charge Secretary",
        ],
      },
    });

    if (users.length < 1) {
      res.status(404).json({ message: "No Doctors" });
      return;
    }

    res.status(200).json({ message: "success", users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const ChangeUserInformationHandler = async (
  req: Request<ChangeUserInterface["params"], {}, ChangeUserInterface["body"]>,
  res: Response
) => {
  try {
    const id = req.params.id;

    const user = await findUser({ _id: id });

    const data = {
      name: req.body.name,
      occupation: req.body.occupation || user?.occupation,
      gender:req.body.gender || user?.gender,
      height:req.body.height || user?.height,
      weight:req.body.weight || user?.weight
    };


    if (!user) {
      res.status(404).json({ message: "user doesn't exist" });
      return;
    }
    const changed = Object.entries(data).every(([key, value]) => 
      user[key as keyof typeof user] === value
    );
    

    console.log(data)
    if (changed) {
      res.status(200).json({ message: "No Changes", state: true });
      return;
    }
    const updatedUser = await updateUser(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "information changed successfully", updatedUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
