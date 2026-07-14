export type SearchResultType = "cafe" | "game" | "review";

export type SearchResult = {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  description: string;
  rating: number;
  location?: string;
  tags: string[];
  popularity: number;
};

export type SearchTypeFilter = "all" | SearchResultType;

export type SearchSort = "relevance" | "rating" | "popularity" | "name";

export type SearchSortDirection = "asc" | "desc";

export type SearchFilters = {
  term: string;
  type: SearchTypeFilter;
  location: string;
  minRating: number | null;
  sort: SearchSort;
  direction: SearchSortDirection;
};

export type SearchRequest = SearchFilters & {
  page: number;
  pageSize: number;
};

export type SearchResponse = {
  results: SearchResult[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
