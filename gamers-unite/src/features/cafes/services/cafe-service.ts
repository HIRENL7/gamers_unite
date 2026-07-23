import {
  parseCafe,
  parseCafeListResponse,
} from "@/features/cafes/schemas/cafe.schema";
import type {
  Cafe,
  CafeListParams,
  CafeListResponse,
} from "@/features/cafes/types/cafe";
import { apiClient } from "@/services/api/client";

export async function getCafes(
  params: CafeListParams = {},
): Promise<CafeListResponse> {
  const response = await apiClient.get<CafeListResponse>("/cafes", {
    params,
  });

  return parseCafeListResponse(response);
}

export async function getCafeById(id: string): Promise<Cafe> {
  const response = await apiClient.get<Cafe>(`/cafes/${id}`);
  return parseCafe(response);
}
