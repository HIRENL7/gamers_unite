import type { Request, Response } from "express";
import type { z } from "zod";

import { asyncHandler } from "../../../shared/utils/async-handler.js";
import { validateRequest } from "../../../shared/middleware/validate.js";
import { searchQuerySchema } from "../schemas/search.schema.js";
import { searchService } from "../services/search.service.js";

type SearchQuery = z.infer<typeof searchQuerySchema>;

export const search = asyncHandler(async (request: Request, response: Response) => {
  const query = request.query as unknown as SearchQuery;
  const data = await searchService.search(query);
  response.json(data);
});

export const searchValidators = {
  query: validateRequest(searchQuerySchema, "query"),
};
