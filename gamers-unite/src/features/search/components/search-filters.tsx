"use client";

import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SearchFilters } from "@/features/search/types/search";
import {
  defaultSearchFilters,
  searchTypeOptions,
} from "@/features/search/utils/search-utils";

type SearchFiltersProps = {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
};

const ratingOptions = [
  { label: "Any", value: null },
  { label: "4.5+", value: 4.5 },
  { label: "4.7+", value: 4.7 },
  { label: "4.9+", value: 4.9 },
];

function SearchFilters({ filters, onChange }: SearchFiltersProps) {
  function updateFilter(nextFilters: Partial<SearchFilters>) {
    onChange({ ...filters, ...nextFilters });
  }

  return (
    <div className="grid gap-4 rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="inline-flex items-center gap-2 text-sm font-semibold">
          <SlidersHorizontal aria-hidden="true" className="size-4" />
          Filters
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onChange(defaultSearchFilters)}
        >
          Reset
        </Button>
      </div>

      <div className="grid gap-2">
        <span className="text-sm font-medium">Type</span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
          {searchTypeOptions.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={filters.type === option.value ? "default" : "outline"}
              onClick={() => updateFilter({ type: option.value })}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium">Location</span>
        <input
          value={filters.location}
          onChange={(event) => updateFilter({ location: event.target.value })}
          placeholder="Neighborhood"
          className="h-10 rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </label>

      <div className="grid gap-2">
        <span className="text-sm font-medium">Minimum rating</span>
        <div className="grid grid-cols-4 gap-2 lg:grid-cols-2">
          {ratingOptions.map((option) => (
            <Button
              key={option.label}
              type="button"
              variant={
                filters.minRating === option.value ? "default" : "outline"
              }
              onClick={() => updateFilter({ minRating: option.value })}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { SearchFilters };
