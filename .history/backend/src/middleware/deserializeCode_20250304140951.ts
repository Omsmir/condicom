import { NextFunction, Response ,Request} from "express";
import { codeSchemaInterface } from "../schemas/code.schema";

export const deserializeCode = async (req:Request<codeSchemaInterface["params"]>,res:Response,next:NextFunction) => {
    try {
        const id = res.locals.user._id

        
    } catch (error) {
        
    }
}