import { AlertTriangle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

type CafeErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

function CafeErrorState({
  message = "We could not load cafes right now.",
  onRetry,
}: CafeErrorStateProps) {
  return (
    <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive">
            <AlertTriangle aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h2 className="font-semibold">Cafe list unavailable</h2>
            <p className="mt-1 text-sm text-muted-foreground">{message}</p>
          </div>
        </div>

        {onRetry ? (
          <Button variant="outline" onClick={onRetry}>
            <RotateCcw aria-hidden="true" />
            Retry
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export { CafeErrorState };
