import { CafeCard } from "@/features/cafes/components/cafe-card";
import type { Cafe } from "@/features/cafes/types/cafe";

type CafeGridProps = {
  cafes: Cafe[];
  selectedCafeId?: string;
  onSelectCafe?: (cafe: Cafe) => void;
};

function CafeGrid({ cafes, selectedCafeId, onSelectCafe }: CafeGridProps) {
  if (cafes.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="font-medium">No cafes found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try another page or adjust the filters when search lands.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {cafes.map((cafe) => (
        <CafeCard
          key={cafe.id}
          cafe={cafe}
          isSelected={cafe.id === selectedCafeId}
          onSelect={onSelectCafe}
        />
      ))}
    </div>
  );
}

export { CafeGrid };
