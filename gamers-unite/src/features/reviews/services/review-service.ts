import { parseReviewListResponse } from "@/features/reviews/schemas/review.schema";
import type {
  ReviewListParams,
  ReviewListResponse,
  ReviewFormValues,
} from "@/features/reviews/types/review";
import { apiClient } from "@/services/api/client";

export async function getReviews(
  params: ReviewListParams = {},
): Promise<ReviewListResponse> {
  const response = await apiClient.get<ReviewListResponse>("/reviews", {
    params,
  });

  return parseReviewListResponse(response);
}

export async function createReview(values: ReviewFormValues) {
  return apiClient.post("/reviews", {
    cafeName: values.cafeName,
    gameTitle: values.gameTitle,
    rating: values.rating,
    title: values.title,
    comment: values.comment,
    category: "setup",
    tags: [],
  });
}
