import express from "express"
import routes from "./routes"
import config from "config"

const port = config.get<string>('port')
const app = express()



app.listen(port,() => {
    console.log('server is connected to port: ')

    routes(app)
})
