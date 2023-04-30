// import { createClient } from 'redis';
import redis from 'redis';

export const DEFAULT_EXPIRATION = 3600

const redisClient = redis.createClient({
    socket: {
        port: 6379,
        host: 'localhost' // localhost or docker service name
    }
})

export default redisClient