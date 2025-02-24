import { Server, Socket } from "socket.io";
import {Server as httpServerType} from 'http'
import { initiator } from "../server";


export const io =  (server:httpServerType) => {

  return  new Server (server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
}


export const SocketInitiator = async (initiator:Server) => {
    try {
    
      initiator.on("connection", (socket:Socket) => {
    
        console.log("connected")
  
        socket.on("disconnect", () => {});
      });
  
    } catch (error) {
      console.log("connection error to the socket", error);
    }
  };