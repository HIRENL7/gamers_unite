"use client";

import { useEffect } from "react";

import Link from "next/link";

import { Container, Section } from "@/components/layout";
import { Button, buttonVariants } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section>
      <Container className="grid max-w-2xl gap-6 py-16 text-center">
        <h1 className="text-heading-1 font-semibold">Something went wrong</h1>
        <p className="text-body text-muted-foreground" role="alert">
          We could not load this page. Try again or return to the home page.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button type="button" onClick={() => reset()}>
            Try again
          </Button>
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Go home
          </Link>
        </div>
      </Container>
    </Section>
  );
}
