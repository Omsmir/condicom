import express from "express"
import multer from "multer"
import { CreateAppointment, createTask, deleteAppointment, editAppointment, getAppointment, getSpecificTask, getTask, getuserAppointments, updateTask } from "../controllers/appointmentController.js"
const router = express.Router()

const storage = multer()

router.get("/tasks",getTask)
router.get("/tasks/:id",getSpecificTask)
router.post("/tasks",storage.none(),createTask)
router.post("/",storage.none(),CreateAppointment)
router.put("/tasks/:id",storage.none(),updateTask)



router.get("/",getAppointment)

router.get("/:userId",getuserAppointments)
router.delete("/:id",deleteAppointment)

router.put("/:id",storage.none(),editAppointment)
export default router