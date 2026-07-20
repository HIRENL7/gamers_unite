import Link from "next/link";
import { Gamepad2 } from "lucide-react";

import { Container, Section } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo/create-metadata";

export const metadata = createMetadata({
  title: "Games",
  description:
    "Browse popular games played at gaming cafes. Game catalog coming soon to Gamers Unite.",
  path: "/games",
  keywords: ["popular games", "esports titles", "console games"],
});

export default function GamesPage() {
  return (
    <Section>
      <Container className="grid max-w-2xl gap-6 py-16">
        <div className="inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Gamepad2 aria-hidden="true" className="size-6" />
        </div>
        <h1 className="text-heading-1 font-semibold">Games catalog</h1>
        <p className="text-body text-muted-foreground">
          A curated games directory is on the way. Until then, search cafes and
          reviews to see what players are running locally.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/search" className={buttonVariants()}>
            Search now
          </Link>
          <Link href="/cafes" className={buttonVariants({ variant: "outline" })}>
            Browse cafes
          </Link>
        </div>
      </Container>
    </Section>
  );
}
