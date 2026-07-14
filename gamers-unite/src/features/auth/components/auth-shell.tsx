import Link from "next/link";
import type * as React from "react";

import { Container, Section } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AuthShellProps = {
  children: React.ReactNode;
  description: string;
  footer?: React.ReactNode;
  title: string;
};

function AuthShell({ children, description, footer, title }: AuthShellProps) {
  return (
    <Section className="min-h-[calc(100svh-8rem)] border-b bg-[linear-gradient(135deg,#f8fafc_0%,var(--background)_48%,#ecfdf5_100%)] dark:bg-[linear-gradient(135deg,#111827_0%,var(--background)_48%,#052e2b_100%)]">
      <Container className="grid min-h-[calc(100svh-8rem)] items-center py-10">
        <div className="mx-auto grid w-full max-w-md gap-5">
          <Link
            href="/"
            className="justify-self-center rounded-md text-sm font-semibold outline-none hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            Gamers Unite
          </Link>
          <Card className="animate-enter rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <p className="text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>
          {footer ? (
            <div className="text-center text-sm text-muted-foreground">
              {footer}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export { AuthShell };
