import { Server } from "socket.io";
import {Server as httpServerType} from 'http'


export const io =  async(server:httpServerType) => {

  return  new Server (server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
}


export const SocketInitiator = async () => {
    try {
    
      io.on("connection", (socket) => {
    
  
        socket.on("disconnect", () => {});
      });
  
    } catch (error) {
      console.log("connection error to the socket", error);
    }
  };