import mongoose from 'mongoose';
import { MONGO_AUTH_USER, MONGO_DB_URI, MONGO_MAIN_DATABASE, MONGO_PASSWD } from 'config';
import { logger } from './logger';

const mongoUri = MONGO_DB_URI || 'mongodb://localhost:27017/';

const connect = async () => {
    try {
        const mongoConnection = await mongoose.connect(mongoUri as string, {
            user: MONGO_AUTH_USER,
            pass: MONGO_PASSWD,
            dbName: MONGO_MAIN_DATABASE,
        });

        logger.info(`server is connected to db: ${mongoConnection.connection.name}`);
    } catch (error: any) {
        logger.error(error.message);
        process.exit(1);
    }
};

export default connect;

export class MongoConnection {
    MONGO_URI: string;
    MONGO_DB: string;

    constructor() {
        this.MONGO_URI = MONGO_DB_URI || 'mongodb://localhost:27017/';
        this.MONGO_DB = MONGO_MAIN_DATABASE || 'test';
    }

    public async connect(): Promise<void> {
        try {
            const mongoConnection = await mongoose.connect(this.MONGO_URI, {
                user: MONGO_AUTH_USER,
                pass: MONGO_PASSWD,
                dbName: this.MONGO_DB,
            });

            logger.info(`Connected to MongoDB: ${mongoConnection.connection.name}`);
        } catch (error: any) {
            logger.error(`MongoDB connection error: ${error.message}`);
            process.exit(1);
        }
    }
}
