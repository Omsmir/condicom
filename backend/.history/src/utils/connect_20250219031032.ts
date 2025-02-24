import mongoose from "mongoose";
import config from "config"

const connect = async () => {
    try {
        const mongoConnection = await mongoose.connect()
        
    } catch (error) {
        
    }
}