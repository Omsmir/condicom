import { Server } from "socket.io";



export const SocketServer =  async() => {

    new Server (server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
}
