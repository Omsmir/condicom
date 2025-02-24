import mongoose from "mongoose";
import config from "config"


const dbUri = config.get('dbUri')

const connect = async () => {
    try {
        const mongoConnection = await mongoose.connect()
        
    } catch (error) {
        
    }
}