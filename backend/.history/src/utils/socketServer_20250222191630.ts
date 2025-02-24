import { Server } from "socket.io";
import {Server as httpServerType} from 'http'


export const SocketServer =  async(server:Ser) => {

  return  new Server (server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
}
