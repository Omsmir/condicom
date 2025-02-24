import { Express } from "express"
import upload from "./middleware/multer"
import { validate } from "./middleware/validateResource"
const routes = (app:Express) => {
app.post('/api/auth',upload.single('profileImg'),validate())
}


export default routes