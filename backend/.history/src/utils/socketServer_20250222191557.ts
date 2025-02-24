import { Server } from "socket.io";



export const SocketServer =  async() => {

  return  new Server (server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
}
