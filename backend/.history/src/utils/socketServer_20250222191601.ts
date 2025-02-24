import { Server } from "socket.io";



export const SocketServer =  async(server:) => {

  return  new Server (server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
}
