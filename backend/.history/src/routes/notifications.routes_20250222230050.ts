import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'

import { notificationSchema } from '../schemas/notifications.schema'
import { createNotificationHandler } from '../controllers/notifications.controller'


const router = express.Router()


router.post("/",upload.none(),validate(notificationSchema),createNotificationHandler)


export default router