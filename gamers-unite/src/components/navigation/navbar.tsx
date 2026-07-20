import Link from "next/link";
import { Menu, Search } from "lucide-react";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type NavbarItem = {
  label: string;
  href: string;
};

type NavbarProps = React.ComponentProps<"header"> & {
  brand?: string;
  items?: NavbarItem[];
  action?: NavbarItem;
};

const defaultItems: NavbarItem[] = [
  { label: "Cafes", href: "/cafes" },
  { label: "Games", href: "/games" },
  { label: "Reviews", href: "/reviews" },
];

function Navbar({
  brand = "Gamers Unite",
  items = defaultItems,
  action = { label: "Search", href: "/search" },
  className,
  ...props
}: NavbarProps) {
  return (
    <header
      data-slot="navbar"
      className={cn(
        "sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75",
        className,
      )}
      {...props}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Container className="flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex min-w-0 items-center rounded-md text-base font-semibold outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50"
          aria-label={`${brand} home`}
        >
          <span className="truncate">{brand}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={action.href}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <Search aria-hidden="true" />
            {action.label}
          </Link>
        </div>

        <details className="group relative md:hidden">
          <summary className="inline-flex size-9 cursor-pointer list-none items-center justify-center rounded-md border bg-background text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Toggle navigation menu</span>
            <Menu aria-hidden="true" className="size-4" />
          </summary>

          <nav
            className="animate-slide-down absolute right-0 top-12 grid min-w-48 gap-1 rounded-lg border bg-popover p-2 text-popover-foreground shadow-md"
            aria-label="Mobile primary"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={action.href}
              className="rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {action.label}
            </Link>
          </nav>
        </details>
      </Container>
    </header>
  );
}

export { Navbar, type NavbarItem };
