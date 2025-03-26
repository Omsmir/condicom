import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { CodeDocument, CodeInput, CodeModel } from "../models/code.model";
import { queryObjects } from "v8";

export const createCode = async (input: CodeInput) => {
  return await CodeModel.create(input);
};

export const findCode = async (query: FilterQuery<CodeDocument>) => {
  return await CodeModel.findOne(query);
};

export const getCodes = async (
  query: FilterQuery<CodeDocument>,
  limit: number,
  cursor?: string
) => {
  if (cursor) {
    query._id = { $lt: cursor };
  }
  const codes = await CodeModel.find(query).sort({ _id: -1 }).limit(limit );

  let nextCursor: string | null = null;
  if (codes.length === limit) {
    nextCursor = codes[limit - 1]._id as string; // Use the last item's _id as the nextCursor
  }

  console.log(codes.length,limit)
  return { codes, nextCursor };
};
export const updateCode = async (
  query: FilterQuery<CodeDocument>,
  update: UpdateQuery<CodeDocument>,
  options?: QueryOptions
) => {
  return await CodeModel.findOneAndUpdate(query, update, options);
};


export const deleteCode = async(filter) =>{

}