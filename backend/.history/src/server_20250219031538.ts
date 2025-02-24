import express from "express"
import routes from "./routes"
import config from "config"
import connect from "./utils/connect"

const port = config.get<string>('port')
const app = express()



app.listen(port,() => {
    console.log(`server is connected to port: ${port}`)

    await connect()

    routes(app)
})
