import { Server } from "socket.io";


const io = new Server (server:Serv,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})