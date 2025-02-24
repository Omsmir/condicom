import { NextFunction, Request, Response } from "express";
import { UserDocument } from "../models/user.model";

export const requireUser = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const user = res.locals.user as UserDocument

        if(!user){
            res.status(403).json({message:"please login"})
        }

        return next()
    } catch (error) {
        
    }
}