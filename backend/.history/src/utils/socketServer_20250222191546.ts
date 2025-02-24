import { Server } from "socket.io";



export const SocketServer =  async() => {
    
}
const io = new Server (server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})