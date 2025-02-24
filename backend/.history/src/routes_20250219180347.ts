import { Express } from "express"
import upload from "./middleware/multer"
import { validate } from "./middleware/validateResource"
import { AddAdditionalSchema, CreateUserSchema } from "./schemas/user.schema"
import { AddAdditionlHandler, createUserHandler } from "./controllers/user.controller"
import { codeSchema } from "./schemas/code.schema"
import { createCodeHandler } from "./controllers/code.controller"
import userRouter from "./routes/user.routes"
const routes = (app:Express) => {
app.post('/api/auth/register',upload.none(),validate(CreateUserSchema),createUserHandler)

app.post("/api/code",upload.none(),validate(codeSchema),createCodeHandler)


app.put("/api/auth/:id",upload.single("profileImg"),validate(AddAdditionalSchema),AddAdditionlHandler)

app.use("/api/auth",userRouter)
}


export default routes