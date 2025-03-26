import { NextFunction, Response ,Request} from "express";
import { codeSchemaInterface } from "../schemas/code.schema";
import { findCode } from "../services/code.service";

export const deserializeCode = async (req:Request<codeSchemaInterface["params"]>,res:Response,next:NextFunction) => {
    try {
        const id = res.locals.user._id

        const code = await findCode({user:id,used:true})
    } catch (error) {
        
    }
}