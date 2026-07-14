function CafeLoadingSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border bg-card"
            aria-hidden="true"
          >
            <div className="h-24 animate-pulse bg-muted" />
            <div className="grid gap-4 p-4">
              <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
              <div className="h-16 animate-pulse rounded bg-muted" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-9 animate-pulse rounded bg-muted" />
                <div className="h-9 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden rounded-lg border bg-card lg:block" aria-hidden="true">
        <div className="h-40 animate-pulse bg-muted" />
        <div className="grid gap-4 p-4">
          <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-20 animate-pulse rounded bg-muted" />
          <div className="h-28 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export { CafeLoadingSkeleton };
