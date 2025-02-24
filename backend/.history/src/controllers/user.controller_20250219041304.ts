import { Request, Response } from "express";
import { CreateUserInterface } from "../schemas/user.schema";
import { uploadImageToFirebase } from "../utils/getPresignedUrl";

export const createUserHandler = async (req:Request<{},{},CreateUserInterface['body']>,res:Response) => {
    try {
        const image = req.file

        const profileImg = await uploadImageToFirebase({})
    } catch (error) {
        
    }
}