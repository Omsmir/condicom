import { NextFunction, Response, Request } from "express";
import { findCode } from "../services/code.service";
import mongoose from "mongoose";

export const deserializeCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = res.locals.user?._id; 
    if (!id) {
       res.status(401).json({ message: "Unauthorized" }); 
       return
    }

    console.log(`id: from codeDeserializer: ${id}`);

    const code = await findCode({ user: mongoose.ob, used: true });

    if (!code) {
       res.status(403).json({ message: "Forbidden" });
       return
    }


    const today = new Date();
    const expiration = new Date(code.expiration); 

    if (today > expiration) { 
       res.status(403).json({ message: "Plan has expired" });
       return
    }

    return next();
  } catch (error) {
    console.error("Error in deserializeCode:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
