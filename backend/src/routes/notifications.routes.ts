import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'

import { getNotificationSchema, notificationSchema } from '../schemas/notifications.schema'
import { createNotificationHandler, getUserNotificationsHandler } from '../controllers/notifications.controller'


const router = express.Router()


router.post("/create",upload.none(),validate(notificationSchema),createNotificationHandler)


router.get("/:id",validate(getNotificationSchema),getUserNotificationsHandler)

export default router