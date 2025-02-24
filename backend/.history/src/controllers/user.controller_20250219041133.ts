import { Request, Response } from "express";
import { CreateUserInterface } from "../schemas/user.schema";

export const createUserHandler = async (req:Request<{},{},CreateUserInterface['body']>,res:Response) => {
    tryc
}