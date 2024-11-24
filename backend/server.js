import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import ProductRoute from "./routes/productsRoute.js";
import userRoute from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
const PORT = process.env.PORT || 8080;
import { mongodbConnection } from "./db/index.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "1gb" }));

app.use(express.json({ limit: "1gb" }));
// app.use(express.urlencoded({extended:false}))
app.use(cors());

app.use("/api/products", ProductRoute);

app.use("/api/auth", userRoute);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  mongodbConnection();
  console.log(`the server is listening to port ${PORT}`);
});
