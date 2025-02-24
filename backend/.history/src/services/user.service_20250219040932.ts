import { Request, Response } from "express";
import UserModel from "../models/user.model";

export const createUser = async (req:Request,res:Response) => {
return await UserModel.create()
}