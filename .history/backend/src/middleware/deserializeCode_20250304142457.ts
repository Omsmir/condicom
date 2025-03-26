import { NextFunction, Response, Request } from "express";
import { findCode } from "../services/code.service";
import mongoose from "mongoose";

export const deserializeCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user; 
    if (!iud) {
       res.status(401).json({ message: "Unauthorized" }); 
       return
    }

    console.log(`id: from codeDeserializer: ${id}`);

    const code = await findCode({ user: new mongoose.Types.ObjectId(id), used: true });

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
