"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getCafeById,
  getCafes,
} from "@/features/cafes/services/cafe-service";
import type { CafeListParams } from "@/features/cafes/types/cafe";
import { queryKeys } from "@/services/query/keys";

export function useCafes({ page = 1, pageSize = 6 }: CafeListParams = {}) {
  return useQuery({
    queryKey: queryKeys.cafes.list(page, pageSize),
    queryFn: () => getCafes({ page, pageSize }),
  });
}

export function useCafe(cafeId?: string) {
  return useQuery({
    queryKey: cafeId
      ? queryKeys.cafes.detail(cafeId)
      : queryKeys.cafes.detail("pending"),
    queryFn: () => getCafeById(cafeId ?? ""),
    enabled: Boolean(cafeId),
  });
}
