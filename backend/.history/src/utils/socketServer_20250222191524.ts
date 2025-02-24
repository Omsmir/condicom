import { Server } from "socket.io";



export const 
const io = new Server (server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})