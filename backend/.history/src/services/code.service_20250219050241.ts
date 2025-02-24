import { CodeInput, CodeModel } from "../models/code.model";

export const createCode = async(input:CodeInput) => {
return await CodeModel.create(input)
}

export const find