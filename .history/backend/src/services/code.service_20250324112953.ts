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
    query.createdAt = { $gt: new Date(cursor) };
  }

  
  const codes = await CodeModel.find(query)
    .sort({ createdAt: -1 })
    .limit(limit);
    
    const nextCursor =
    codes.length === limit
      ? codes[codes.length - 1].createdAt.toISOString()
      : null;

export const updateCode = async (
  query: FilterQuery<CodeDocument>,
  update: UpdateQuery<CodeDocument>,
  options?: QueryOptions
) => {
  return await CodeModel.findOneAndUpdate(query, update, options);
};
