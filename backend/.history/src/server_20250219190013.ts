import express from "express"
import routes from "./routes"
import config from "config"
import connect from "./utils/connect"
import log from "./utils/logger"
import { errorHandler, notFound } from "./middleware/errorHandler"
import { deserializeUser } from "./middleware/deserializeUser"
import cors from "cors"
const port = config.get<string>('port')
const app = express()


app.use(express.json())

app.use(express.urlencoded({extended:true}))

// app.use(errorHandler)
// app.use(notFound)

app.use(cors({
    origin:"*",
    credentials: true, // Allow cookies & auth headers if needed
    methods: ["GET", "POST", "PUT", "DELETE"]
  }))
  

app.use(deserializeUser)
app.listen(port,async() => {
   log.info(`server is connected to port: ${port}`)

    await connect()

    routes(app)
})


