import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { CodeDocument, CodeInput, CodeModel } from "../models/code.model";

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
    query._id = { $lt: new ObjectId(cursor) }; // Convert string cursor to ObjectId
  }

  // Fetch exactly `limit` documents
  const codes = await CodeModel.find(query).sort({ _id: -1 }).limit(limit);

  let nextCursor: string | null = null;
  if (codes.length === limit) {
    nextCursor = codes[codes.length - 1]._id.toString(); // Set next cursor to last item
  }

  return { codes, nextCursor };
};
export const updateCode = async (
  query: FilterQuery<CodeDocument>,
  update: UpdateQuery<CodeDocument>,
  options?: QueryOptions
) => {
  return await CodeModel.findOneAndUpdate(query, update, options);
};
