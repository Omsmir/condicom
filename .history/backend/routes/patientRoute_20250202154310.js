import express from "express"
import multer from "multer"
const router = express.Router()

const storage = multer()


router.post("/",storage.none(),createPatient)

router.get("/",getAppointment)

router.get("/:userId",getuserAppointments)
router.delete("/:id",deleteAppointment)

router.put("/:id",storage.none(),editAppointment)
export default router