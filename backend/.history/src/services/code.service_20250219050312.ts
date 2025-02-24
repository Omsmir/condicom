import { FilterQuery } from "mongoose";
import { CodeDocument, CodeInput, CodeModel } from "../models/code.model";

export const createCode = async(input:CodeInput) => {
return await CodeModel.create(input)
}

export const findCode = async (query:FilterQuery<CodeDocument>) => {
    return await 
}