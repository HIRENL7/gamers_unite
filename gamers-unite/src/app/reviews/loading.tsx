import { Container, Section } from "@/components/layout";

export default function ReviewsLoading() {
  return (
    <Section>
      <Container aria-label="Loading reviews">
        <div className="grid gap-4">
          <div className="h-10 w-64 animate-pulse rounded bg-muted" />
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-48 animate-pulse rounded-lg bg-muted"
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
