import type { Request, Response } from "express";
import type { z } from "zod";

import { asyncHandler } from "../../../shared/utils/async-handler.js";
import { requireAuth, validateRequest } from "../../../shared/middleware/validate.js";
import { userRepository } from "../../users/repositories/user.repository.js";
import {
  createReviewBodySchema,
  reviewListQuerySchema,
} from "../schemas/review.schema.js";
import { reviewService } from "../services/review.service.js";

type ReviewListQuery = z.infer<typeof reviewListQuerySchema>;
type CreateReviewBody = z.infer<typeof createReviewBodySchema>;

export const listReviews = asyncHandler(async (request: Request, response: Response) => {
  const query = request.query as unknown as ReviewListQuery;
  const data = await reviewService.listReviews(query);
  response.json(data);
});

export const createReview = asyncHandler(async (request: Request, response: Response) => {
  const user = await userRepository.findById(request.auth!.sub);

  if (!user) {
    response.status(404).json({ success: false, message: "User not found" });
    return;
  }

  const body = request.body as CreateReviewBody;
  const data = await reviewService.createReview(request.auth!, body, user.name);
  response.status(201).json(data);
});

export const reviewValidators = {
  list: validateRequest(reviewListQuerySchema, "query"),
  create: [requireAuth, validateRequest(createReviewBodySchema)],
};
