import mongoose from "mongoose";
import config from "config"


const dbUri = config.get<string>('dbUri')

const connect = async () => {
    try {
        const mongoConnection = await mongoose.connect(dbUri,{
            user:config.get('mongoUser'),
            pass:config.get('mongoPasswd'),
            dbName:config.get('m')
        })
        
    } catch (error) {
        
    }
}