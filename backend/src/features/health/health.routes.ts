import { Router } from "express";

import { asyncHandler } from "../../shared/utils/async-handler.js";
import { getMongoHealth } from "../../shared/database/mongodb.js";
import { getRedisHealth } from "../../shared/database/redis.js";

const healthRouter = Router();

healthRouter.get(
  "/",
  asyncHandler(async (_request, response) => {
    const [mongo, redis] = await Promise.all([getMongoHealth(), getRedisHealth()]);

    const status = mongo && redis ? "ok" : "degraded";

    response.status(status === "ok" ? 200 : 503).json({
      success: true,
      status,
      services: {
        mongo,
        redis,
      },
      timestamp: new Date().toISOString(),
    });
  }),
);

export { healthRouter };
