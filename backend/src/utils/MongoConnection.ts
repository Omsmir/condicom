import { MONGO_MAIN_DATABASE, MONGO_PASSWD, MONGO_DB_URI, MONGO_AUTH_USER } from '@/config/index';
import { logger } from './logger';
import mongoose from 'mongoose';

// Singleton Design Pattern
class MongoConnection {
    private static MONGO_DB_URI: string;
    private static MONGO_DB_NAME: string;
    private static instance: MongoConnection;

    private constructor() {
        MongoConnection.MONGO_DB_URI = MONGO_DB_URI || 'mongodb://localhost:27017/';
        MongoConnection.MONGO_DB_NAME = MONGO_MAIN_DATABASE || 'test';
        this.initializeConnection();
    }

    static getInstance(): MongoConnection {
        if (!MongoConnection.instance) {
            MongoConnection.instance = new MongoConnection();
        }
        return MongoConnection.instance;
    }
    private async initializeConnection() {
        try {
            const connection = await mongoose.connect(MongoConnection.MONGO_DB_URI, {
                user: MONGO_AUTH_USER,
                pass: MONGO_PASSWD,
                dbName: MongoConnection.MONGO_DB_NAME,
            });
            logger.info(`Mongodb is connected to database:${connection.connection.name}`);
        } catch (error: any) {
            logger.error(error.message);
            throw new Error(error.message);
        }
    }
}

export default MongoConnection;
