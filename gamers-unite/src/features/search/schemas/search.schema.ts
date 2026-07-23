import type {
  SearchResponse,
  SearchResult,
  SearchResultType,
} from "@/features/search/types/search";

const searchResultTypes: SearchResultType[] = ["cafe", "game", "review"];

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isSearchResultType(value: unknown): value is SearchResultType {
  return (
    typeof value === "string" &&
    searchResultTypes.includes(value as SearchResultType)
  );
}

function isSearchResult(value: unknown): value is SearchResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const result = value as Record<string, unknown>;

  return (
    typeof result.id === "string" &&
    isSearchResultType(result.type) &&
    typeof result.title === "string" &&
    typeof result.subtitle === "string" &&
    typeof result.description === "string" &&
    typeof result.rating === "number" &&
    (result.location === undefined || typeof result.location === "string") &&
    isStringArray(result.tags) &&
    typeof result.popularity === "number"
  );
}

export function parseSearchResponse(value: unknown): SearchResponse {
  if (!value || typeof value !== "object") {
    throw new Error("Invalid search response");
  }

  const response = value as Record<string, unknown>;

  if (
    !Array.isArray(response.results) ||
    !response.results.every(isSearchResult) ||
    typeof response.page !== "number" ||
    typeof response.pageSize !== "number" ||
    typeof response.totalItems !== "number" ||
    typeof response.totalPages !== "number"
  ) {
    throw new Error("Invalid search response");
  }

  return response as SearchResponse;
}
