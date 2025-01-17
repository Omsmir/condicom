import express from "express";
import {
  CreateNotification,
  getAllNotifications,
  GetNotifications,
  SystemNotifications,
  UpdateNotification,
} from "../controllers/notificationsSystemControllers.js";
import multer from "multer";
const router = express.Router();
const storage = multer();
import { io } from "../server.js";



router.post("/create", storage.none(), CreateNotification);

router.get("/single/:id", GetNotifications);

router.put("/:id", storage.none(), UpdateNotification);

router.get("/:id", getAllNotifications);

router.post("/system",storage.none(),SystemNotifications)
export default router;
