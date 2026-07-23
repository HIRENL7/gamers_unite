import { parseSearchResponse } from "@/features/search/schemas/search.schema";
import type {
  SearchRequest,
  SearchResponse,
} from "@/features/search/types/search";
import { apiClient } from "@/services/api/client";

export async function searchMockResults(
  request: SearchRequest,
): Promise<SearchResponse> {
  const response = await apiClient.get<unknown>("/search", {
    params: {
      ...request,
      minRating: request.minRating ?? "",
    },
  });

  return parseSearchResponse(response);
}
