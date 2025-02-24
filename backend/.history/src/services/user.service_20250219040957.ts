import { Request, Response } from "express";
import UserModel, { UserDocument } from "../models/user.model";

export const createUser = async (input:UserDocument) => {
return await UserModel.create()
}