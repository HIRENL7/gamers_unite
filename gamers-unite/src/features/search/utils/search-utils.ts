import type {
  SearchFilters,
  SearchSort,
  SearchSortDirection,
  SearchTypeFilter,
} from "@/features/search/types/search";

type SearchParamReader = {
  get: (name: string) => string | null;
};

export const defaultSearchFilters: SearchFilters = {
  term: "",
  type: "all",
  location: "",
  minRating: null,
  sort: "relevance",
  direction: "desc",
};

export const searchTypeOptions: { label: string; value: SearchTypeFilter }[] = [
  { label: "All", value: "all" },
  { label: "Cafes", value: "cafe" },
  { label: "Games", value: "game" },
  { label: "Reviews", value: "review" },
];

export const searchSortOptions: { label: string; value: SearchSort }[] = [
  { label: "Relevance", value: "relevance" },
  { label: "Rating", value: "rating" },
  { label: "Popularity", value: "popularity" },
  { label: "Name", value: "name" },
];

export function parseSearchType(value: string | null): SearchTypeFilter {
  return value === "cafe" || value === "game" || value === "review"
    ? value
    : "all";
}

export function parseSearchSort(value: string | null): SearchSort {
  return value === "rating" || value === "popularity" || value === "name"
    ? value
    : "relevance";
}

export function parseSearchDirection(
  value: string | null
): SearchSortDirection {
  return value === "asc" ? "asc" : "desc";
}

export function parseMinRating(value: string | null) {
  if (!value) {
    return null;
  }

  const rating = Number(value);

  return Number.isFinite(rating) ? rating : null;
}

export function searchFiltersFromParams(params: SearchParamReader): SearchFilters {
  return {
    term: params.get("q") ?? "",
    type: parseSearchType(params.get("type")),
    location: params.get("location") ?? "",
    minRating: parseMinRating(params.get("minRating")),
    sort: parseSearchSort(params.get("sort")),
    direction: parseSearchDirection(params.get("dir")),
  };
}

export function searchFiltersToParams(filters: SearchFilters) {
  const params = new URLSearchParams();

  if (filters.term.trim()) {
    params.set("q", filters.term.trim());
  }

  if (filters.type !== defaultSearchFilters.type) {
    params.set("type", filters.type);
  }

  if (filters.location.trim()) {
    params.set("location", filters.location.trim());
  }

  if (filters.minRating !== null) {
    params.set("minRating", String(filters.minRating));
  }

  if (filters.sort !== defaultSearchFilters.sort) {
    params.set("sort", filters.sort);
  }

  if (filters.direction !== defaultSearchFilters.direction) {
    params.set("dir", filters.direction);
  }

  return params;
}
