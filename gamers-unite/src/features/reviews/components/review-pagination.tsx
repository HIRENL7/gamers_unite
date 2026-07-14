"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { clampReviewPage } from "@/features/reviews/utils/review-utils";

type ReviewPaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function ReviewPagination({
  page,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
}: ReviewPaginationProps) {
  const safePage = clampReviewPage(page, totalPages);
  const start = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, totalItems);

  return (
    <nav
      className="flex flex-col gap-3 rounded-lg border bg-card p-3 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Reviews pagination"
    >
      <p className="text-sm text-muted-foreground">
        Showing {start}-{end} of {totalItems} reviews
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Previous reviews page"
          disabled={safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        <span className="flex min-w-24 items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium">
          {safePage} / {Math.max(totalPages, 1)}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Next reviews page"
          disabled={safePage >= totalPages}
          onClick={() => onPageChange(safePage + 1)}
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
}

export { ReviewPagination };
