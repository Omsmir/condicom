import express from "express"
import routes from "./routes"
import config from "config"
import connect from "./utils/connect"
import log from "./utils/logger"

const port = config.get<string>('port')
const app = express()


app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.listen(port,async() => {
   log.info(`server is connected to port: ${port}`)

    await connect()

    routes(app)
})


