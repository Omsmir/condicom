import express from 'express'
import upload from '../middleware/multer'
import { validate } from '../middleware/validateResource'
import { AddAdditionalSchema, CreateUserSchema } from '../schemas/user.schema'
import { AddAdditionlHandler, createUserHandler } from '../controllers/user.controller'


const router = express.Router()


export default router