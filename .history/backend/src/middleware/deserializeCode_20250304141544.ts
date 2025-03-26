import { NextFunction, Response ,Request} from "express";
import { codeSchemaInterface } from "../schemas/code.schema";
import { findCode } from "../services/code.service";

export const deserializeCode = async (req:Request,res:Response,next:NextFunction) => {
 
        
        const id = res.locals.user._id

        console.log(`id:from codeDeserializer:${id}`)
        const code = await findCode({user:id,used:true})

        if(!code){
             res.status(403).json({message:"forbidden"})
             return
        }

        const today = new Date()

        if(today.getDate() > code.expiration.getDate()){
            return res.status(403).json({message:"plan has been expired"})
        }
        return next()
    
}