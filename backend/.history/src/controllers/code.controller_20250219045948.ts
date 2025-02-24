import { NextFunction, Request, Response } from "express";
import { CreateUserInterface } from "../schemas/user.schema";
import { uploadImageToFirebase } from "../utils/getPresignedUrl";
import { createUser, findUser } from "../services/user.service";

export const createCodeHandler = async (req:)