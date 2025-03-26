import { NextFunction, Response ,Request} from "express";
import { codeSchemaInterface } from "../schemas/code.schema";
import { findCode } from "../services/code.service";

export const deserializeCode = async (req:Request,res:Response,next:NextFunction) => {
    try {
        
        const id = res.locals.user._id

        console.log(`id:`)
        const code = await findCode({user:id,used:true})

        if(!code){
            return res.status(403).json({message:"forbidden"})
        }

        const today = new Date()

        if(today.getDate() > code.expiration.getDate()){
            return res.status(403).json({message:"plan has been expired"})
        }
        return next()
    } catch (error:any) {
        console.log(error.message)
    }
}