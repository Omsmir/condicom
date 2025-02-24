import mongoose from "mongoose";


const connect = async () => {
    try {
        const mongoConnection = await mongoose.connect()
        
    } catch (error) {
        
    }
}