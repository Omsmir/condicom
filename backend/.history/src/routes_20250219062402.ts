import { Express } from "express"
import upload from "./middleware/multer"
import { validate } from "./middleware/validateResource"
import { CreateUserSchema } from "./schemas/user.schema"
import { createUserHandler } from "./controllers/user.controller"
import { codeSchema } from "./schemas/code.schema"
import { createCodeHandler } from "./controllers/code.controller"
const routes = (app:Express) => {
app.post('/api/auth/register',upload.single('profileImg'),validate(CreateUserSchema),createUserHandler)

app.post("/api/code",upload.none(),validate(codeSchema),createCodeHandler)


app.put("/api/auth/:id",upload.single("profileImg"))
}


export default routes