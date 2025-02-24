import express from "express"
import routes from "./routes"
import config from "config"
import connect from "./utils/connect"
import log from "./utils/logger"
import { errorHandler, notFound } from "./middleware/errorHandler"
import { deserializeUser } from "./middleware/deserializeUser"
import cors from "cors"
import cookieParser from "cookie-parser"
import http from "http"
const port = config.get<string>('port')
const app = express()

const server = 

app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
// app.use(errorHandler)
// app.use(notFound)

app.use(cors({
    origin:"*",
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"]
  }))
  

app.use(deserializeUser)
app.listen(port,async() => {
   log.info(`server is connected to port: ${port}`)

    await connect()

    routes(app)
})


