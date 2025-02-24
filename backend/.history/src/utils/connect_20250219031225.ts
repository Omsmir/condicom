import mongoose from "mongoose";
import config from "config"


const dbUri = config.get<string>('dbUri')

const connect = async () => {
    try {
        const mongoConnection = await mongoose.connect(dbUri,{
            user:conf
            pass:config.get('mongoPasswd')
        })
        
    } catch (error) {
        
    }
}