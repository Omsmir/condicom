import { Request, Response } from "express";
import UserModel, { UserDocument, UserInput } from "../models/user.model";

export const createUser = async (input:UserInput) => {
return await UserModel.create(input)
}