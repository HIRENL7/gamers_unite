"use client";

import { useQuery } from "@tanstack/react-query";

import { getReviews } from "@/features/reviews/services/review-service";
import type { ReviewListParams } from "@/features/reviews/types/review";
import { queryKeys } from "@/services/query/keys";

export function useReviews({ page = 1, pageSize = 4 }: ReviewListParams = {}) {
  return useQuery({
    queryKey: queryKeys.reviews.list(page, pageSize),
    queryFn: () => getReviews({ page, pageSize }),
  });
}
