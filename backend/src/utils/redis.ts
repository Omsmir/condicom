import { createClient, RedisClientType } from 'redis';
import { NODE_ENV, REDIS_DEV_URI, REDIS_PWD } from 'config';
import { logger } from './logger';

class RedisConnection {
    public redisClient: RedisClientType | null;

    constructor() {
        this.redisClient = null;
    }
    public async initializeConnection(): Promise<RedisClientType> {
        try {
            if (!this.redisClient) {
                this.redisClient = createClient({
                    url: NODE_ENV === 'development' ? REDIS_DEV_URI : '',
                    password: REDIS_PWD,
                });

                this.redisClient.on('connect', () => {
                    logger.info('connected to redis');
                });


                this.redisClient.on("error",() => {
                    logger.error("redis connection error please check connectivity")
                })
                await this.redisClient.connect(); // Ensure the client is connected
            }
            return this.redisClient;
        } catch (error:any) {
            logger.error(error);
            throw new Error(error.message);
        }
    }
}

// export const redisBroker = async () => {
//         const connection = new RedisConnection();

// const redis = await connection.listen();

//     const subscriber = redis.duplicate();

//     subscriber.on('error', error => {
//         console.log(error.message);
//     });
//     await subscriber.connect();
//     subscriber.on('connect', () => {
//         logger.info('subscribed to the redis pub/sub');
//     });

//     await subscriber.subscribe('events', message => {
//         console.log(message);
//         initiator.emit('redis-updates', message);
//     });
// };

interface addToHashProps {
    HashName: string;
    token: any;
    channel?: string;
    expire: number;
    content: object;
}

interface CreateHashProps {
    HashName: string;
    content: any;
    expire?: number;
}

export const addToHash = async ({ HashName, token, channel, expire, content }: addToHashProps) => {
    const connection = new RedisConnection();

    const redis = await connection.initializeConnection();

    await redis.hSet(HashName, token);

    Object.entries(content).forEach(([key, value]) => {
        redis.hSet(`${HashName}:1`, key, value);
    });
    await redis.expire(HashName, expire);
};

export const createHash = async ({ HashName, content, expire }: CreateHashProps) => {
    const connection = new RedisConnection();

    const redis = await connection.initializeConnection();

    await redis.hSet(HashName, content);

    if (expire) {
        await redis.expire(HashName, expire);
    }
};

export const checkHash = async (HashName: string, value: string) => {
    const connection = new RedisConnection();

    const redis = await connection.initializeConnection();

    return await redis.hGet(HashName, value);
};

export const DelHash = async (HashName: string, value: string) => {
    const connection = new RedisConnection();

    const redis = await connection.initializeConnection();

    return await redis.hDel(HashName, value);
};

export const GetHashExpiration = async (HashName: string) => {
    const connection = new RedisConnection();

    const redis = await connection.initializeConnection();
    return await redis.ttl(HashName);
};

export default RedisConnection;
