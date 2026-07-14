"use client";

import { MessageSquareText, RotateCcw } from "lucide-react";
import * as React from "react";

import { Container, Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { CommentForm } from "@/features/reviews/components/comment-form";
import { ReviewCard } from "@/features/reviews/components/review-card";
import { ReviewPagination } from "@/features/reviews/components/review-pagination";
import { useReviews } from "@/features/reviews/hooks/use-reviews";

const PAGE_SIZE = 4;

function ReviewsView() {
  const [page, setPage] = React.useState(1);
  const reviewsQuery = useReviews({ page, pageSize: PAGE_SIZE });

  return (
    <div className="flex flex-1 flex-col">
      <Section className="border-b bg-[linear-gradient(135deg,#f8fafc_0%,var(--background)_48%,#fff1f2_100%)] dark:bg-[linear-gradient(135deg,#111827_0%,var(--background)_48%,#3b0712_100%)]">
        <Container className="grid gap-5 py-10">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <MessageSquareText aria-hidden="true" className="size-4" />
              Reviews
            </p>
            <h1 className="mt-2 text-heading-1 font-semibold">
              Read what players noticed after the match.
            </h1>
            <p className="mt-4 text-body text-muted-foreground">
              Browse mock player reviews with accessible ratings, animated
              cards, local validation, and paginated review history.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div className="grid gap-4">
              {reviewsQuery.isLoading ? <ReviewsLoadingSkeleton /> : null}

              {reviewsQuery.isError ? (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="font-semibold">Reviews unavailable</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {reviewsQuery.error.message}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => void reviewsQuery.refetch()}
                    >
                      <RotateCcw aria-hidden="true" />
                      Retry
                    </Button>
                  </div>
                </div>
              ) : null}

              {reviewsQuery.data ? (
                <>
                  <div className="grid gap-4" aria-live="polite">
                    {reviewsQuery.data.reviews.map((review, index) => (
                      <ReviewCard
                        key={review.id}
                        review={review}
                        index={index}
                      />
                    ))}
                  </div>
                  <ReviewPagination
                    page={reviewsQuery.data.page}
                    pageSize={reviewsQuery.data.pageSize}
                    totalItems={reviewsQuery.data.totalItems}
                    totalPages={reviewsQuery.data.totalPages}
                    onPageChange={setPage}
                  />
                </>
              ) : null}
            </div>

            <aside className="lg:sticky lg:top-20 lg:self-start">
              <CommentForm />
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function ReviewsLoadingSkeleton() {
  return (
    <div className="grid gap-4" aria-label="Loading reviews">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border bg-card p-4"
          aria-hidden="true"
        >
          <div className="flex gap-3">
            <div className="size-11 animate-pulse rounded-md bg-muted" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
              <div className="h-20 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { ReviewsView };
