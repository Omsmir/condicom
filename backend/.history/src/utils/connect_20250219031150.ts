import mongoose from "mongoose";
import config from "config"


const dbUri = config.get('')

const connect = async () => {
    try {
        const mongoConnection = await mongoose.connect()
        
    } catch (error) {
        
    }
}