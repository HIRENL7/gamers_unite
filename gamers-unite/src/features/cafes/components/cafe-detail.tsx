import {
  Coffee,
  Gamepad2,
  MapPin,
  MonitorUp,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
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

type CafeDetailProps = {
  cafe: Cafe;
};

function CafeDetail({ cafe }: CafeDetailProps) {
  return (
    <aside className="sticky top-20 grid gap-4 self-start">
      <Card className="rounded-lg">
        <div className={cn("h-40 bg-gradient-to-br", cafe.heroTone)}>
          <div className="flex h-full items-end p-4 text-white">
            <div>
              <p className="text-sm font-medium text-white/75">
                {formatCafeLocation(cafe)}
              </p>
              <h2 className="mt-1 text-2xl font-semibold">{cafe.name}</h2>
            </div>
          </div>
        </div>

        <CardHeader>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-sm font-medium text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:ring-amber-900">
              <Star aria-hidden="true" className="size-4 fill-current" />
              {cafe.rating.toFixed(1)} ({cafe.reviewCount})
            </span>
            <span className="rounded-md bg-muted px-2 py-1 text-sm font-medium">
              {formatCafePrice(cafe.pricePerHour)}
            </span>
            <span className="rounded-md bg-muted px-2 py-1 text-sm font-medium">
              {cafe.crowdLevel}
            </span>
          </div>
        </CardHeader>

        <CardContent className="grid gap-5">
          <p className="text-sm leading-6 text-muted-foreground">
            {cafe.description}
          </p>

          <div className="grid gap-3 text-sm">
            <DetailRow icon={MapPin} label="Address" value={cafe.address} />
            <DetailRow
              icon={MonitorUp}
              label="Availability"
              value={formatSeatAvailability(cafe)}
            />
            <DetailRow icon={Users} label="Crowd" value={cafe.crowdLevel} />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg" size="sm">
        <CardHeader>
          <CardTitle>Featured games</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {cafe.featuredGames.map((game) => (
            <span
              key={game}
              className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-sm"
            >
              <Gamepad2 aria-hidden="true" className="size-4" />
              {game}
            </span>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-lg" size="sm">
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          {cafe.amenities.map((amenity) => (
            <span
              key={amenity}
              className="inline-flex items-center gap-2 text-sm"
            >
              <Coffee
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
              {amenity}
            </span>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[1rem_1fr] gap-x-3 gap-y-1">
      <Icon aria-hidden="true" className="mt-0.5 size-4 text-muted-foreground" />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

export { CafeDetail };
