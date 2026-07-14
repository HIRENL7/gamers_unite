"use client";

import { Loader2, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Container, Section } from "@/components/layout";
import { SearchBar } from "@/features/search/components/search-bar";
import { SearchFilters } from "@/features/search/components/search-filters";
import { SearchResultsList } from "@/features/search/components/search-results-list";
import { SearchSorting } from "@/features/search/components/search-sorting";
import { useDebouncedValue } from "@/features/search/hooks/use-debounced-value";
import { useSearchResults } from "@/features/search/hooks/use-search-results";
import type { SearchFilters as SearchFiltersState } from "@/features/search/types/search";
import {
  searchFiltersFromParams,
  searchFiltersToParams,
} from "@/features/search/utils/search-utils";

function SearchView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = React.useState<SearchFiltersState>(() =>
    searchFiltersFromParams(searchParams)
  );
  const debouncedTerm = useDebouncedValue(filters.term, 350);
  const debouncedLocation = useDebouncedValue(filters.location, 350);
  const queryFilters = React.useMemo(
    () => ({
      ...filters,
      term: debouncedTerm,
      location: debouncedLocation,
    }),
    [
      debouncedLocation,
      debouncedTerm,
      filters.direction,
      filters.minRating,
      filters.sort,
      filters.type,
    ]
  );
  const searchQuery = useSearchResults(queryFilters);
  const results = React.useMemo(
    () => searchQuery.data?.pages.flatMap((page) => page.results) ?? [],
    [searchQuery.data?.pages]
  );
  const totalItems = searchQuery.data?.pages[0]?.totalItems ?? 0;

  React.useEffect(() => {
    const params = searchFiltersToParams(queryFilters);
    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    if (searchParams.toString() !== queryString) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [pathname, queryFilters, router, searchParams]);

  const loadMore = React.useCallback(() => {
    if (searchQuery.hasNextPage && !searchQuery.isFetchingNextPage) {
      void searchQuery.fetchNextPage();
    }
  }, [
    searchQuery.fetchNextPage,
    searchQuery.hasNextPage,
    searchQuery.isFetchingNextPage,
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <Section className="border-b bg-[linear-gradient(135deg,#f8fafc_0%,var(--background)_48%,#fef3c7_100%)] dark:bg-[linear-gradient(135deg,#111827_0%,var(--background)_48%,#451a03_100%)]">
        <Container className="grid gap-6 py-10">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-muted-foreground">
              Search
            </p>
            <h1 className="mt-2 text-heading-1 font-semibold">
              Search cafes, games, and reviews.
            </h1>
            <p className="mt-4 text-body text-muted-foreground">
              Use debounced search, filters, sorting, and infinite loading
              against mock data wired through TanStack Query.
            </p>
          </div>

          <SearchBar
            value={filters.term}
            onChange={(term) => setFilters((current) => ({ ...current, term }))}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <SearchFilters filters={filters} onChange={setFilters} />

            <div className="grid gap-4">
              <SearchSorting filters={filters} onChange={setFilters} />

              <div className="flex flex-col gap-2 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">Results</p>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery.isLoading
                      ? "Searching..."
                      : `${totalItems} result${totalItems === 1 ? "" : "s"}`}
                  </p>
                </div>
                {searchQuery.isFetching && !searchQuery.isFetchingNextPage ? (
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                    Updating
                  </span>
                ) : null}
              </div>

              {searchQuery.isLoading ? <SearchLoadingSkeleton /> : null}

              {searchQuery.isError ? (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
                  <div className="flex items-start gap-3">
                    <Search
                      aria-hidden="true"
                      className="mt-0.5 size-5 text-destructive"
                    />
                    <div>
                      <h2 className="font-semibold">Search unavailable</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {searchQuery.error.message}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              {searchQuery.data ? (
                <SearchResultsList
                  results={results}
                  hasNextPage={Boolean(searchQuery.hasNextPage)}
                  isFetchingNextPage={searchQuery.isFetchingNextPage}
                  onLoadMore={loadMore}
                />
              ) : null}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function SearchLoadingSkeleton() {
  return (
    <div className="grid gap-4" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="rounded-lg border bg-card p-4">
          <div className="flex gap-3">
            <div className="size-10 animate-pulse rounded-md bg-muted" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
              <div className="h-16 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { SearchView };
