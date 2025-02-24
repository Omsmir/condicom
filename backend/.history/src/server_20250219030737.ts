import express from "express"
import routes from "./routes"



const app = express()



app.listen(1336,() => {
    console.log('connected')

    routes(app)
})
