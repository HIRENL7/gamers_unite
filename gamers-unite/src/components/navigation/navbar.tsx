import * as React from "react";

import { MiniNavbar } from "@/components/ui/mini-navbar";

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
    <MiniNavbar
      brand={brand}
      items={items}
      action={action}
      className={className}
      {...props}
    />
  );
}

export { Navbar, type NavbarItem };
