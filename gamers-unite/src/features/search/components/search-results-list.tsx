"use client";

import { Loader2 } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { SearchResultCard } from "@/features/search/components/search-result-card";
import type { SearchResult } from "@/features/search/types/search";

type SearchResultsListProps = {
  results: SearchResult[];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
};

function SearchResultsList({
  results,
  isFetchingNextPage,
  hasNextPage,
  onLoadMore,
}: SearchResultsListProps) {
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];

      if (firstEntry?.isIntersecting && !isFetchingNextPage) {
        onLoadMore();
      }
    });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  if (results.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="font-medium">No results found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try a broader search, another type, or a lower rating filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {results.map((result) => (
        <SearchResultCard key={`${result.type}-${result.id}`} result={result} />
      ))}

      <div ref={sentinelRef} className="h-1" aria-hidden="true" />

      {hasNextPage ? (
        <Button
          type="button"
          variant="outline"
          className="justify-self-center"
          disabled={isFetchingNextPage}
          onClick={onLoadMore}
        >
          {isFetchingNextPage ? (
            <Loader2 aria-hidden="true" className="animate-spin" />
          ) : null}
          Load more
        </Button>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          End of results
        </p>
      )}
    </div>
  );
}

export { SearchResultsList };
