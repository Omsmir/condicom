import { Server } from "socket.io";



export const SocketServer =  asyc
const io = new Server (server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})