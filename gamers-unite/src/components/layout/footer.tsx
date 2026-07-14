import Link from "next/link";
import * as React from "react";

import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type FooterLink = {
  label: string;
  href: string;
};

type FooterProps = React.ComponentProps<"footer"> & {
  links?: FooterLink[];
};

const defaultLinks: FooterLink[] = [
  { label: "Cafes", href: "/cafes" },
  { label: "Games", href: "/games" },
  { label: "Reviews", href: "/reviews" },
  { label: "Search", href: "/search" },
];

function Footer({ links = defaultLinks, className, ...props }: FooterProps) {
  return (
    <footer
      data-slot="footer"
      className={cn("border-t bg-background/95", className)}
      {...props}
    >
      <Container className="flex flex-col gap-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-foreground">Gamers Unite</p>
          <p className="mt-1 text-xs">Find places to play, gather, and review.</p>
        </div>

        <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Footer">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}

export { Footer, type FooterLink };
