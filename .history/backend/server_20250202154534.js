import express from "express";

import dotenv from "dotenv";

import bodyParser from "body-parser";

import ProductRoute from "./routes/productsRoute.js";

import userRoute from "./routes/userRoutes.js";

import appointmentRoute from "./routes/AppointmentRoute.js"

import notificationRoute from "./routes/notificationsRoute.js"

import { notFound, errorHandler } from "./middleware/errorHandler.js";
const PORT = process.env.PORT || 8080;
import { mongodbConnection } from "./db/index.js";
import cors from "cors";
import http from "http";
import {Server} from "socket.io"
import { verifyUser } from "./controllers/userController.js";


dotenv.config();

export const app = express();


 const SocketInitiator = async () => {
    try {
    
      io.on("connection", (socket) => {
    
  
        socket.on("disconnect", () => {});
      });
  
    } catch (error) {
      console.log("connection error to the socket", error);
    }
  };


app.use(bodyParser.json({ limit: "1gb" }));

app.use(express.json({ limit: "1gb" }));

app.use(express.urlencoded({extended:false}))

app.use(cors());

app.use("/api/products", ProductRoute);

app.use("/api/auth", userRoute);

app.use("/api/appointments",appointmentRoute)

app.use("/api/notifications",notificationRoute)

app.use("/api/patient")

app.use(notFound);

app.use(errorHandler);




const server = http.createServer(app)

export const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})




server.listen(PORT,async () => {
  mongodbConnection();
 
await SocketInitiator()

  console.log(`the server is listening to port ${PORT}`);
 
});


