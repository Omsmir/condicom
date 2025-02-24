import mongoose from "mongoose";
import config from "config"
import log from "./logger";


const dbUri = config.get<string>('dbUri')

const connect = async () => {
    try {
        const mongoConnection = await mongoose.connect(dbUri,{
            user:config.get('mongoUser'),
            pass:config.get('mongoPasswd'),
            dbName:config.get('mainDB')
        })
        

        log.info(`server is connected to db: ${mongoConnection.connection.name}`)
    } catch (error:any) {
        log.error(error.message)
        process.exit(1)
    }
}


export default connect