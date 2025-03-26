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

  const codes = await CodeModel.find(query).sort({ _id: -1 }).limit(limit);

  const nextCursor = codes.length == limit ? codes[codes.length - 1]._id : null;

  console.log(codes,limit)
  return { codes, nextCursor };
};
export const updateCode = async (
  query: FilterQuery<CodeDocument>,
  update: UpdateQuery<CodeDocument>,
  options?: QueryOptions
) => {
  return await CodeModel.findOneAndUpdate(query, update, options);
};
