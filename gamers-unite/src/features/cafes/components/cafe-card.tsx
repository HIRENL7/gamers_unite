import { Clock, MapPin, MonitorUp, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Cafe } from "@/features/cafes/types/cafe";
import {
  formatCafeLocation,
  formatCafePrice,
  formatSeatAvailability,
} from "@/features/cafes/utils/cafe-utils";
import { cn } from "@/lib/utils";

type CafeCardProps = {
  cafe: Cafe;
  isSelected?: boolean;
  onSelect?: (cafe: Cafe) => void;
};

function CafeCard({ cafe, isSelected = false, onSelect }: CafeCardProps) {
  return (
    <Card
      className={cn(
        "rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-md",
        isSelected && "ring-2 ring-primary"
      )}
    >
      <div className={cn("h-24 bg-gradient-to-br", cafe.heroTone)}>
        <div className="grid h-full grid-cols-6 gap-2 p-3" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              key={index}
              className="rounded-sm bg-white/15 ring-1 ring-white/10"
            />
          ))}
        </div>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="truncate">{cafe.name}</CardTitle>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin aria-hidden="true" className="size-4" />
              <span className="truncate">{formatCafeLocation(cafe)}</span>
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-sm font-medium text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:ring-amber-900">
            <Star aria-hidden="true" className="size-4 fill-current" />
            {cafe.rating.toFixed(1)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
          {cafe.description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="inline-flex items-center gap-2 rounded-md bg-muted px-2.5 py-2">
            <MonitorUp aria-hidden="true" className="size-4" />
            {formatSeatAvailability(cafe)}
          </span>
          <span className="inline-flex items-center gap-2 rounded-md bg-muted px-2.5 py-2">
            <Clock aria-hidden="true" className="size-4" />
            Until {cafe.openUntil}
          </span>
        </div>
      </CardContent>

      <CardFooter className="justify-between gap-3">
        <div>
          <p className="text-sm font-medium">
            {formatCafePrice(cafe.pricePerHour)}
          </p>
          <p className="text-xs text-muted-foreground">
            {cafe.crowdLevel} crowd
          </p>
        </div>
        <Button
          variant={isSelected ? "default" : "outline"}
          onClick={() => onSelect?.(cafe)}
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export { CafeCard };
