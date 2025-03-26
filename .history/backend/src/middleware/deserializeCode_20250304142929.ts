import { NextFunction, Response, Request } from "express";
import { findCode } from "../services/code.service";
import mongoose from "mongoose";
import { UserDocument } from "../models/user.model";

export const deserializeCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user as UserDocument
    if (!user ) {
       res.status(401).json({ message: "Unauthorized" }); 
       return
    }

    if(!mongoose.Types.ObjectId.isValid(user._id) ){
        
    }
    console.log(user._id);

    const code = await findCode({ user: user._id, used: true });

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
