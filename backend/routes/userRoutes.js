import express from "express";
import { codeGenerator, Login, register } from "../controllers/userController.js";

import multer from "multer";
const router = express.Router()

const storage = multer()

router.post("/register",storage.none(),register)

router.post("/login",Login)

router.post("/generate",storage.none(),codeGenerator)
export default router
