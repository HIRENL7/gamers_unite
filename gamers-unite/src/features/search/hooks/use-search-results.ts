"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { searchMockResults } from "@/features/search/services/search-service";
import type { SearchFilters } from "@/features/search/types/search";
import { queryKeys } from "@/services/query/keys";

const PAGE_SIZE = 5;

function serializeSearchFilters(filters: SearchFilters) {
  return JSON.stringify(filters);
}

export function useSearchResults(filters: SearchFilters) {
  return useInfiniteQuery({
    queryKey: queryKeys.search.infinite(serializeSearchFilters(filters)),
    queryFn: ({ pageParam }) =>
      searchMockResults({
        ...filters,
        page: Number(pageParam),
        pageSize: PAGE_SIZE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
}
