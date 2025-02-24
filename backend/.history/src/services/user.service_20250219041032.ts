import UserModel, {  UserInput } from "../models/user.model";

export const createUser = async (input:UserInput) => {
return await UserModel.create(input)
}