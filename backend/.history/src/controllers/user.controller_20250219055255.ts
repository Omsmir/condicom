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
      console.log("Request Body:", req.body);
  
      const email = req.body.email;
      const code = req.body.code;
  
      // Check if the user already exists
      const existingUser = await findUser({ email });
      console.log("Existing User:", existingUser);
  
      if (existingUser) {
        return res.status(403).json({ message: "User already exists" });
      }
  
      // Check if the code has already been used
      const usedCode = await findUser({ code });
      console.log("Used Code:", usedCode);
  
      if (usedCode) {
        return res.status(409).json({ message: "This Code is Used" });
      }
  
      // Check if the code exists
      const preCode = await findCode({ code });
      console.log("Pre Code:", preCode);
  
      if (!preCode) {
        return res.status(404).json({ message: "Invalid Code Provided" });
      }
  
      // Ensure preCode is marked as used and saved
      preCode.used = true;
      await preCode.save(); // ✅ Save the update in MongoDB
  
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
  