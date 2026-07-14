import * as React from "react";

import { cn } from "@/lib/utils";

type SidebarProps = React.ComponentProps<"aside"> & {
  label?: string;
};

function Sidebar({
  className,
  children,
  label = "Secondary navigation",
  ...props
}: SidebarProps) {
  return (
    <aside
      data-slot="sidebar"
      className={cn(
        "hidden w-64 shrink-0 border-r bg-sidebar text-sidebar-foreground lg:block",
        className,
      )}
      aria-label={label}
      {...props}
    >
      <div className="sticky top-16 grid gap-3 p-4">
        {children ?? (
          <div className="animate-fade-in rounded-lg border border-dashed border-sidebar-border bg-sidebar-accent/40 p-4 text-sm text-sidebar-foreground/70">
            <p className="font-medium text-sidebar-foreground">
              Sidebar placeholder
            </p>
            <p className="mt-1 text-xs leading-5">
              Reserved for filters, local navigation, or contextual actions.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

export { Sidebar };
