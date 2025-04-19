import { createClient, RedisClientType } from "redis";
import config from "config";
import log from "./logger";
import { initiator } from "../server";
let redisClient: RedisClientType | null = null;

export const RedisConnection = async (): Promise<RedisClientType> => {
  if (!redisClient) {
    redisClient = createClient({
      url: config.get<string>("redisDevUri"),
      password: config.get<string>("redisPwd"),
    });

    redisClient.on("error", (err) => {
      log.error("error connecting to redis");
    });
    redisClient.connect().catch((err) => log.error(err));

    redisClient.on("connect", () => {
      log.info("connected to redis");
    });
  }
  return redisClient;
};

export const redisBroker = async () => {
  const redis = await RedisConnection();

  const subscriber = redis.duplicate();

  subscriber.on("error", (error) => {
    console.log(error.message);
  });
  await subscriber.connect();
  subscriber.on("connect", () => {
    log.info("subscribed to the redis pub/sub");
  });

  await subscriber.subscribe("events", (message) => {
    console.log(message);
    initiator.emit("redis-updates", message);
  });
};

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

export const addToHash = async ({
  HashName,
  token,
  channel,
  expire,
  content,
}: addToHashProps) => {
  const redis = await RedisConnection();

  await redis.hSet(HashName, token);

  Object.entries(content).forEach(([key, value]) => {
    redis.hSet(`${HashName}:1`, key, value);
  });
  await redis.expire(HashName, expire);
};

export const createHash = async ({
  HashName,
  content,
  expire,
}: CreateHashProps) => {
  const redis = await RedisConnection();

  await redis.hSet(HashName, content);

  if(expire) {
    await redis.expire(HashName, expire);
  }
};

export const checkHash = async (HashName: string, value: string) => {
  const redis = await RedisConnection();

  return await redis.hGet(HashName, value);
};

export const DelHash = async (HashName: string, value: string) => {
  const redis = await RedisConnection();

  return await redis.hDel(HashName, value);
};
