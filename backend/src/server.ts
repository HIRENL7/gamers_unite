import { createApp } from "./app.js";
import { env } from "./shared/config/env.js";
import { connectMongoDB, disconnectMongoDB } from "./shared/database/mongodb.js";
import { connectRedis, disconnectRedis } from "./shared/database/redis.js";

async function bootstrap() {
  await connectMongoDB();
  await connectRedis();

  const app = createApp();

  const server = app.listen(env.port, () => {
    console.info(`GameSunite API listening on http://localhost:${env.port}${env.apiPrefix}`);
  });

  const shutdown = async (signal: string) => {
    console.info(`Received ${signal}. Shutting down...`);
    server.close(async () => {
      await disconnectRedis();
      await disconnectMongoDB();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => {
    void shutdown("SIGINT");
  });

  process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
