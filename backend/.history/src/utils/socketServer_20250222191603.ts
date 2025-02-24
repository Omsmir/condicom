import { Server } from "socket.io";



export const SocketServer =  async(server:Ser) => {

  return  new Server (server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
}
