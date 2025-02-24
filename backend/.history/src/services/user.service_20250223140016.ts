import {
  FilterQuery,
  QueryOptions,
  SchemaTypeOptions,
  UpdateQuery,
} from "mongoose";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import { omit } from "lodash";

export const createUser = async (input: UserInput) => {
    try {
        const user = await UserModel.create(input);
    
        return omit(user.toJSON(), "password");
      } catch (e: any) {
        throw new Error(e);
      }
};

export const updateUser = async (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options?: QueryOptions
) => {
  return await UserModel.findOneAndUpdate(query, update, options);
};

export const findUser = async (query: FilterQuery<UserDocument>) => {
  return await UserModel.findOne(query).lean();
};


export const getAllUsers = async (query?:FilterQuery<UserDocument>) => {
return await UserModel.fin
}
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
