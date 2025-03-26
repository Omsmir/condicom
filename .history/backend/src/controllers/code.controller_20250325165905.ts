import { NextFunction, Request, Response } from "express";
import {
  codeSchemaInterface,
  DeleteCodeSchemaInterface,
  GetcodeSchemaInterface,
} from "../schemas/code.schema";
import {
  detectExpiredCode,
  generateCode,
  generateExpirationDate,
  role,
  signRole,
} from "../utils/backevents";
import { createCode, findCode, getCodes } from "../services/code.service";
import { findUser } from "../services/user.service";
import mongoose from "mongoose";

export const createCodeHandler = async (
  req: Request<codeSchemaInterface["params"], {}, codeSchemaInterface["body"]>,
  res: Response
) => {
  try {
    const id = req.params.id;

    const existingAdminUser = await findUser({ _id: id, role: "Admin" });

    if (!existingAdminUser || !id) {
      res.status(403).json({ message: "forbidden" });
      return;
    }
    const numbers = [req.body.numbers];
    const fiveNumbers = [req.body.fiveNumbers];
    const characters = [req.body.characters];

    const obj = {
      numbers,
      fiveNumbers,
      characters,
    };
    const code = generateCode({ ...obj });

    const existingCode = await findCode({ code });

    if (existingCode) {
      res.status(409).json({ message: "Code already exists" });
      return;
    }
    const role = signRole(code);

    if (!role) {
      res.status(400).json({ message: "Not Supported Yet" });
      return;
    }

    const expiration = generateExpirationDate({ month: req.body.expiration });

    const newCode = await createCode({ role, code, expiration });

    res.status(201).json({
      message: `${newCode.role} code generated successfully`,
      code: newCode,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getCodesHandler = async (
  req: Request<
    GetcodeSchemaInterface["params"],
    {},
    {},
    GetcodeSchemaInterface["query"]
  >,
  res: Response
) => {
  try {
    const id = req.params.id;

    const limit = req.query.limit;
    const cursor = req.query.cursor;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "invalid id provided" });
      return;
    }
    const existingAdminUser = await findUser({ _id: id, role: "Admin" });

    if (!existingAdminUser || !id) {
      res.status(403).json({ message: "forbidden" });
      return;
    }

    const { codes, nextCursor } = await getCodes({}, limit || 3, cursor);

    if (!codes || codes.length < 1) {
      res.status(403).json({ message: "no codes" });
      return;
    }

    res.status(200).json({ codes, nextCursor });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCodeHandler = async (
  req: Request<DeleteCodeSchemaInterface["params"],{},DeleteCodeSchemaInterface["body"]>,
  res: Response
) => {
  try {
    const id = req.params.id
    const code = req.body.code
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "invalid id provided" });
      return;
    }
    const existingAdminUser = await findUser({ _id: id, role: "Admin" });

    if (!existingAdminUser || !id) {
      res.status(403).json({ message: "forbidden" });
      return;
    }

    const existingCode = await findCode({code})

    if(!existingCode){
      res.status(404).json({message:"code not found"})
      return
    }
  

    const usedCode = () => {
      if(!existingCode.user || exitCode.u)
    }

    if(!expired){

    }

  } catch (error) {}
};
