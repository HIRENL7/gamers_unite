import { Container, Section } from "@/components/layout";
import { CafeLoadingSkeleton } from "@/features/cafes/components/cafe-loading-skeleton";

export default function CafesLoading() {
  return (
    <Section>
      <Container aria-label="Loading cafes">
        <CafeLoadingSkeleton />
      </Container>
    </Section>
  );
}
