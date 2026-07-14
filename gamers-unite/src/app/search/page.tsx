import type { Metadata } from "next";
import { Suspense } from "react";

import { Container, Section } from "@/components/layout";
import { SearchView } from "@/features/search/components/search-view";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search mock gaming cafes, games, and reviews with filters, sorting, and infinite scrolling.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchView />
    </Suspense>
  );
}

function SearchPageFallback() {
  return (
    <Section>
      <Container>
        <div className="grid gap-4">
          <div className="h-12 max-w-3xl animate-pulse rounded-lg bg-muted" />
          <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <div className="h-72 animate-pulse rounded-lg bg-muted" />
            <div className="grid gap-4">
              <div className="h-16 animate-pulse rounded-lg bg-muted" />
              <div className="h-40 animate-pulse rounded-lg bg-muted" />
              <div className="h-40 animate-pulse rounded-lg bg-muted" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
