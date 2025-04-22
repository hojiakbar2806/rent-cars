import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from './const';

export const redis = new Redis({
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
});