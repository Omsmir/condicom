import { Express } from "express"
import userRouter from "./routes/user.routes"
import codeRouter from "./routes/code.routes"
import appointmentRouter from "./routes/appointment.routes"
import patientRouter from "./routes/patient.routes"
import medicationRouter from "./routes/medication.routes"
import router from "./routes/notifications.routes"
const routes = (app:Express) => {
// code router
app.use('/api/code',codeRouter)
// user router
app.use("/api/auth",userRouter)

app.use("/api/appointments",appointmentRouter)

app.use("/api/patient",patientRouter)

app.use("/api/medications",medicationRouter)

app.use("/api/notifications",router)
}


export default routes