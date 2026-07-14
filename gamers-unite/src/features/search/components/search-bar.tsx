"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">Search</span>
      <span className="flex h-12 items-center gap-2 rounded-lg border bg-background px-3 shadow-sm">
        <Search aria-hidden="true" className="size-4 text-muted-foreground" />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          type="search"
          placeholder="Try Valorant, console pods, Koramangala"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {value ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Clear search"
            onClick={() => onChange("")}
          >
            <X aria-hidden="true" />
          </Button>
        ) : null}
      </span>
    </label>
  );
}

export { SearchBar };
