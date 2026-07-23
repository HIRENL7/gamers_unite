import { randomUUID } from "node:crypto";

import type { AccessTokenPayload } from "../../../shared/utils/jwt.js";
import { reviewRepository } from "../repositories/review.repository.js";
import { getInitials, mapReviewToDto } from "../utils/map-review.js";

export const reviewService = {
  async listReviews(input: { page: number; pageSize: number; cafeName?: string }) {
    const { items, totalItems } = await reviewRepository.findPaginated(input);
    const totalPages = Math.max(Math.ceil(totalItems / input.pageSize), 1);
    const page = Math.min(input.page, totalPages);

    return {
      reviews: items.map(mapReviewToDto),
      page,
      pageSize: input.pageSize,
      totalItems,
      totalPages,
    };
  },

  async createReview(
    auth: AccessTokenPayload,
    input: {
      cafeName: string;
      gameTitle: string;
      rating: number;
      title: string;
      comment: string;
      category: "setup" | "staff" | "food" | "crowd";
      tags: string[];
    },
    authorName: string,
  ) {
    const review = await reviewRepository.createReview({
      slug: `review-${randomUUID()}`,
      cafeName: input.cafeName,
      gameTitle: input.gameTitle,
      authorName,
      authorInitials: getInitials(authorName),
      authorId: auth.sub,
      rating: input.rating,
      category: input.category,
      title: input.title,
      comment: input.comment,
      visitedAt: new Date().toISOString().slice(0, 10),
      helpfulCount: 0,
      tags: input.tags,
    });

    return mapReviewToDto(review);
  },
};
