import { Express } from "express"
import upload from "./middleware/multer"
import { validate } from "./middleware/validateResource"
import { CreateUserSchema } from "./schemas/user.schema"
import { createUserHandler } from "./controllers/user.controller"
const routes = (app:Express) => {
app.post('/api/auth/register',upload.single('profileImg'),validate(CreateUserSchema),createUserHandler)

app.post("/api/code/")
}


export default routes