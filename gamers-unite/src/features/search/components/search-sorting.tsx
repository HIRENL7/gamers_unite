"use client";

import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

import { Button } from "@/components/ui/button";
import type {
  SearchFilters,
  SearchSort,
} from "@/features/search/types/search";
import { searchSortOptions } from "@/features/search/utils/search-utils";

type SearchSortingProps = {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
};

function SearchSorting({ filters, onChange }: SearchSortingProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
      <label className="grid gap-1 sm:min-w-48">
        <span className="text-xs font-medium text-muted-foreground">Sort by</span>
        <select
          value={filters.sort}
          onChange={(event) =>
            onChange({ ...filters, sort: event.target.value as SearchSort })
          }
          className="h-9 rounded-md border bg-background px-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {searchSortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          onChange({
            ...filters,
            direction: filters.direction === "asc" ? "desc" : "asc",
          })
        }
      >
        {filters.direction === "asc" ? (
          <ArrowUpAZ aria-hidden="true" />
        ) : (
          <ArrowDownAZ aria-hidden="true" />
        )}
        {filters.direction === "asc" ? "Ascending" : "Descending"}
      </Button>
    </div>
  );
}

export { SearchSorting };
