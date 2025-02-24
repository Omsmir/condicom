import { Express } from "express"
import upload from "./middleware/multer"
import { validate } from "./middleware/validateResource"
import { codeSchema } from "./schemas/code.schema"
import { createCodeHandler } from "./controllers/code.controller"
import userRouter from "./routes/user.routes"
import router from "./routes/code.routes"
const routes = (app:Express) => {

app.use('/api/',router)
app.use("/api/auth",userRouter)
}


export default routes