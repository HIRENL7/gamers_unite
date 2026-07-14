import { Container, Section } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col" aria-label="Loading home page">
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5">
            <Skeleton className="h-8 w-52 rounded-full" />
            <Skeleton className="h-16 w-full max-w-3xl rounded-lg" />
            <Skeleton className="h-20 w-full max-w-2xl rounded-lg" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
          </div>
          <Skeleton className="min-h-80 rounded-lg" />
        </Container>
      </Section>

      <Section spacing="sm" className="bg-muted/30">
        <Container>
          <Skeleton className="h-28 rounded-lg" />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="space-y-3">
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-10 w-full max-w-xl rounded" />
            <Skeleton className="h-6 w-full max-w-2xl rounded" />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="rounded-lg">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-muted ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}
