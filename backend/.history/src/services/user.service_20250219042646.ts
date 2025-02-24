import { FilterQuery } from "mongoose";
import UserModel, {  UserDocument, UserInput } from "../models/user.model";

export const createUser = async (input:UserInput) => {
return await UserModel.create(input)
}



export const findUser = async (query:FilterQuery<UserDocument>) => {
    return await UserModel.findon
}