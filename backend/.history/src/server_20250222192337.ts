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
import { Server } from "socket.io"
import { io, SocketInitiator } from "./utils/socketServer"
const port = config.get<string>('port')
const app = express()

const server = http.createServer(app)


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

export const initiator = io(server)


server.listen(port,async() => {
   log.info(`server is connected to port: ${port}`)

   await SocketInitiator()
    await connect()

    routes(app)
})


