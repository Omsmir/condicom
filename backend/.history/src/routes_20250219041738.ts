import { Express } from "express"
import upload from "./middleware/multer"
import { validate } from "./middleware/validateResource"
import { CreateUserSchema } from "./schemas/user.schema"
const routes = (app:Express) => {
app.post('/api/auth',upload.single('profileImg'),validate(CreateUserSchema),createUserHandler)
}


export default routes