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


export const SocketInitiator = async (server:httpServerType) => {
    try {
    
      io(server).on("connection", (socket:Socket) => {
    
  
        socket.on("disconnect", () => {});
      });
  
    } catch (error) {
      console.log("connection error to the socket", error);
    }
  };