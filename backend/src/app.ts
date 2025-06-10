import express from 'express';
import { CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from '@/config';
import { deserializeUser } from './middleware/deserializeUser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import SocketServer from './utils/socketServer';
import RedisConnection from './utils/redis';
import morgan from 'morgan';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import { logger, stream } from './utils/logger';
import { ErrorHandler } from './middleware/errorHandler';
import { MongoConnection } from './utils/connect';
import { disconnect, set } from 'mongoose';
import { Routes } from './interfaces/routes.interface';
import { developedBy, healthShape } from './utils/constants';

class App {
    public port: number | string;
    public app: express.Application;
    public env: string;
    public server: http.Server;
    public static initiator: Server;
    public mongoConnection: MongoConnection;

    private constructor(routes: Routes[]) {
        this.port = PORT || 8080;
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.server = http.createServer(this.app);
        App.initiator = SocketServer.io(this.server);
        this.mongoConnection = new MongoConnection();

        this.connectToMongo();
        this.connectToRedis();
        this.socketInitialize();
        this.initializeMiddlewares();
        this.initializeImplementedMiddlwares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    public listen() {
        this.server.listen(this.port, async () => {
            logger.info(`\n${healthShape}\n${developedBy}`);
            logger.warn(`===== http://localhost:${this.port} =====`);
            logger.info(`===========${this.env}===========`);
            logger.info(`===========port:${this.port}=============`);
            logger.info(`=================================`);
        });
    }

    public async closeDatabaseConnection(): Promise<void> {
        try {
            await disconnect();
            logger.info('Disconnected from MongoDB');
        } catch (error) {
            logger.error('Error closing database connection:', error);
        }
    }

    private async connectToMongo() {
        if (NODE_ENV != 'production') {
            set('debug', true);
        }
        await this.mongoConnection.connect();
    }

    private async connectToRedis() {
        const redisConnection = new RedisConnection();

        await redisConnection.initializeConnection();
    }
    private async socketInitialize() {
        SocketServer.SocketInitiator(App.initiator);
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route: Routes) => {
            this.app.use('/api', route.router);
        });
    }
    static create(routes: Routes[]): App {
        return new App(routes);
    }

    private initializeMiddlewares() {
        this.app.use(morgan(LOG_FORMAT || 'dev', { stream: stream }));
        this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private initializeImplementedMiddlwares() {
        this.app.use(deserializeUser);
        // this.app.use(deserializeCode);
    }

    private initializeErrorHandling() {
        this.app.use(ErrorHandler);
    }
}

export default App;
