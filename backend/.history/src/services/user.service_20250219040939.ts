import { Request, Response } from "express";
import UserModel from "../models/user.model";

export const createUser = async (input:) => {
return await UserModel.create()
}