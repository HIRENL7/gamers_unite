import type { Request, Response } from "express";
import type { z } from "zod";

import { asyncHandler } from "../../../shared/utils/async-handler.js";
import { requireAuth, validateRequest } from "../../../shared/middleware/validate.js";
import {
  cafeIdParamsSchema,
  cafeListQuerySchema,
} from "../schemas/cafe.schema.js";
import { cafeService } from "../services/cafe.service.js";

type CafeListQuery = z.infer<typeof cafeListQuerySchema>;
type CafeIdParams = z.infer<typeof cafeIdParamsSchema>;

export const listCafes = asyncHandler(async (request: Request, response: Response) => {
  const query = request.query as unknown as CafeListQuery;
  const data = await cafeService.listCafes(query);
  response.json(data);
});

export const getCafeById = asyncHandler(async (request: Request, response: Response) => {
  const params = request.params as unknown as CafeIdParams;
  const data = await cafeService.getCafeById(params.id);
  response.json(data);
});

export const cafeValidators = {
  list: validateRequest(cafeListQuerySchema, "query"),
  byId: validateRequest(cafeIdParamsSchema, "params"),
};
