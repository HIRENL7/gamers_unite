import { Redis } from "ioredis";

import { env } from "../config/env.js";

let redisClient: Redis | null = null;

export function getRedisClient() {
  if (!redisClient) {
    redisClient = new Redis(env.redisUrl, {
      maxRetriesPerRequest: 1,
      lazyConnect: true,
    });
  }

  return redisClient;
}

export async function connectRedis() {
  const client = getRedisClient();

  if (client.status === "wait") {
    await client.connect();
  }

  return client;
}

export async function disconnectRedis() {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
  }
}

export async function getRedisHealth() {
  const client = getRedisClient();

  if (client.status === "wait") {
    await client.connect();
  }

  const response = await client.ping();
  return response === "PONG";
}

export async function getCachedJson<TValue>(key: string) {
  const client = getRedisClient();
  const cached = await client.get(key);

  if (!cached) {
    return null;
  }

  return JSON.parse(cached) as TValue;
}

export async function setCachedJson(key: string, value: unknown, ttlSeconds: number) {
  const client = getRedisClient();
  await client.set(key, JSON.stringify(value), "EX", ttlSeconds);
}

export async function deleteCachedKeys(pattern: string) {
  const client = getRedisClient();
  const keys = await client.keys(pattern);

  if (keys.length > 0) {
    await client.del(...keys);
  }
}
