import { Express } from "express"
import upload from "./middleware/multer"
const routes = (app:Express) => {
app.post('/api/auth',upload.single('profileImg'),)
}


export default routes