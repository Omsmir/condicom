import { Server } from "socket.io";


const io = new Server (server:S,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})