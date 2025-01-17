import express from "express";
import { AddAddtionalInformation, codeGenerator, deleteUser, getAllUsers, getUser, Login, register } from "../controllers/userController.js";

import multer from "multer";
const router = express.Router()

const storage = multer()

const upload = multer({ storage: multer.memoryStorage() });

router.post("/register",storage.none(),register)

 
router.post("/login",Login)

router.post("/generate",storage.none(),codeGenerator)

router.put("/:id",upload.single("profileImg"),AddAddtionalInformation)

router.get("/:id",getUser)

router.get("/",getAllUsers)


router.delete("/:id",deleteUser)
export default router


