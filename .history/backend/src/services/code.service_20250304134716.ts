import { FilterQuery, UpdateQuery } from "mongoose";
import { CodeDocument, CodeInput, CodeModel } from "../models/code.model";

export const createCode = async(input:CodeInput) => {
return await CodeModel.create(input)
}

export const findCode = async (query:FilterQuery<CodeDocument>) => {
    return await CodeModel.findOne(query)
}



export const updateCode = async (query:FilterQuery<CodeDocument>,update:UpdateQuery<CodeDocument>,options?:)