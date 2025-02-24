import { Express } from "express"
import upload from "./middleware/multer"
import { validate } from "./middleware/validateResource"
import { codeSchema } from "./schemas/code.schema"
import { createCodeHandler } from "./controllers/code.controller"
import userRouter from "./routes/user.routes"
import codeRouter from "./routes/code.routes"
import appointmentRouter from "./routes/appointment.routes"
const routes = (app:Express) => {
// code router
app.use('/api/code',codeRouter)
// user router
app.use("/api/auth",userRouter)

app.use("/api/appointments",appointmentRouter)
}


export default routes