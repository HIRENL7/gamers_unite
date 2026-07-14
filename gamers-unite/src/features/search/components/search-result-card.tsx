import { Gamepad2, MapPin, MessageSquareText, Store, Star } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SearchResult } from "@/features/search/types/search";
import { cn } from "@/lib/utils";

type SearchResultCardProps = {
  result: SearchResult;
};

const resultIcons = {
  cafe: Store,
  game: Gamepad2,
  review: MessageSquareText,
};

const resultAccents = {
  cafe: "bg-emerald-500",
  game: "bg-sky-500",
  review: "bg-rose-500",
};

function SearchResultCard({ result }: SearchResultCardProps) {
  const Icon = resultIcons[result.type];

  return (
    <Card className="rounded-lg">
      <CardHeader>
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-md text-white",
              resultAccents[result.type]
            )}
          >
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="truncate">{result.title}</CardTitle>
              <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium capitalize">
                {result.type}
              </span>
            </div>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              {result.location ? (
                <MapPin aria-hidden="true" className="size-4" />
              ) : null}
              {result.subtitle}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-sm font-medium text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:ring-amber-900">
            <Star aria-hidden="true" className="size-4 fill-current" />
            {result.rating.toFixed(1)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        <p className="text-sm leading-6 text-muted-foreground">
          {result.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {result.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border px-2 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { SearchResultCard };
