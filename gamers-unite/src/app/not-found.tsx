import Link from "next/link";

import { Container, Section } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo/create-metadata";

export const metadata = createMetadata({
  title: "Page Not Found",
  description: "The page you are looking for does not exist on Gamers Unite.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <Section>
      <Container className="grid max-w-2xl gap-6 py-16 text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-heading-1 font-semibold">Page not found</h1>
        <p className="text-body text-muted-foreground">
          The page you requested is not available. Explore cafes, search, or
          reviews instead.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={buttonVariants()}>
            Go home
          </Link>
          <Link href="/cafes" className={buttonVariants({ variant: "outline" })}>
            Browse cafes
          </Link>
        </div>
      </Container>
    </Section>
  );
}
