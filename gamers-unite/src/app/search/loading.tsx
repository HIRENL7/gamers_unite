import { Container, Section } from "@/components/layout";

export default function SearchLoading() {
  return (
    <Section>
      <Container aria-label="Loading search">
        <div className="grid gap-4">
          <div className="h-12 max-w-3xl animate-pulse rounded-lg bg-muted" />
          <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <div className="h-72 animate-pulse rounded-lg bg-muted" />
            <div className="grid gap-4">
              <div className="h-16 animate-pulse rounded-lg bg-muted" />
              <div className="h-40 animate-pulse rounded-lg bg-muted" />
              <div className="h-40 animate-pulse rounded-lg bg-muted" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
