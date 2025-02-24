import { FilterQuery } from "mongoose";
import UserModel, {  UserDocument, UserInput } from "../models/user.model";
import { omit } from "lodash";

export const createUser = async (input:UserInput) => {
return await UserModel.create(input)
}



export const findUser = async (query:FilterQuery<UserDocument>) => {
    return await UserModel.findOne(query).lean()
}


console.log(signRole('B13C50766'))

export const validatePassword = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return false;
      }
      const isValid = await user.comparePassword(password);
  
      if (!isValid) {
        return false;
      }
  
      return omit(user.toJSON(), "password");
    } catch (error: any) {
      throw new Error(`validate service error ${error.message}`);
    }
  };