import express from "express"
import routes from "./routes"
import config from "config"

const port = config.get<string>('port')
const app = express()



app.listen(1336,() => {
    console.log('connected')

    routes(app)
})
