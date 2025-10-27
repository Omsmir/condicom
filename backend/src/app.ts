import express from 'express';
import {
    BODYSIZELIMIT,
    CREDENTIALS,
    LOG_FORMAT,
    NODE_ENV,
    ORIGIN,
    PORT,
    PROJECT_NAME,
} from '@/config';
import DeserializeMiddleware from './middleware/deserializeUser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import SocketServer from './utils/socketServer';
import { RedisConnection } from './utils/redis';
import morgan from 'morgan';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import { logger, stream } from './utils/logger';
import { ErrorHandler } from './middleware/errorHandler';
import { disconnect, set } from 'mongoose';
import { Routes } from './interfaces/routes.interface';
import { developedBy, healthShape, SIGNALS } from './utils/constants';
import RateLimiters from './middleware/rateLimiters';
import MongoConnection from './utils/MongoConnection';
import { sanitizeRequest } from './middleware/xss';
import { gracefulShutdown } from './utils/gracefulEvents';
import { SendEmail } from './utils/emailUtils';

class App {
    public port: number | string;
    public app: express.Application;
    public env: string;
    public server: http.Server;
    public static initiator: Server;
    public static mongoConnection: MongoConnection;
    public static RedisConnection: RedisConnection;

    private constructor(routes: Routes[]) {
        this.port = PORT || 8080;
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.server = http.createServer(this.app);
        App.initiator = SocketServer.io(this.server);
        App.mongoConnection = MongoConnection.getInstance();
        App.RedisConnection = RedisConnection.getInstance();

        this.socketInitialize();
        this.initializeMiddlewares();
        this.initializeImplementedMiddlwares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
        this.setupGracefulShutdown();
    }

    public listen() {
        this.server.listen(this.port, async () => {
            logger.info(`\n${healthShape}\n${developedBy}`);
            logger.info(`===== http://localhost:${this.port} =====`);
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

    // private async connectToRedis() {
    //     const redisConnection = new RedisConnection();

    //     await redisConnection.initializeConnection();
    // }
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
        this.app.use(hpp({ checkBody: true }));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json({ limit: BODYSIZELIMIT }));
        this.app.use(express.urlencoded({ extended: true, limit: BODYSIZELIMIT }));
        this.app.use(cookieParser());
        this.app.set('trust proxy', 1);
        this.app.use(sanitizeRequest);
    }

    private initializeImplementedMiddlwares() {
        this.app.use(new DeserializeMiddleware().deserializeUser);
        this.app.use(RateLimiters.GlobalRateLimiter);
        // this.app.use(deserializeCode);
    }

    private initializeErrorHandling() {
        this.app.use(ErrorHandler);
    }

    public getServer() {
        // specfic for testing
        return this.app;
    }

    private async setupGracefulShutdown() {
        for (const signal of SIGNALS) {
            process.on(signal, async () => await gracefulShutdown.shutdown(signal));
        }
    }
}

export default App;
