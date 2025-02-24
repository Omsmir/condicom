import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'


const router = express.Router()


export default router