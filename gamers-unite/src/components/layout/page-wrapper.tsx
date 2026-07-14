import * as React from "react";

import { Footer } from "@/components/layout/footer";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/navigation/navbar";
import { cn } from "@/lib/utils";

type PageWrapperProps = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  navbar?: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarLabel?: string;
  showSidebar?: boolean;
  className?: string;
  contentClassName?: string;
  mainClassName?: string;
};

function PageWrapper({
  children,
  footer,
  navbar,
  sidebar,
  sidebarLabel,
  showSidebar = false,
  className,
  contentClassName,
  mainClassName,
}: PageWrapperProps) {
  return (
    <div
      data-slot="page-wrapper"
      className={cn("flex min-h-svh flex-col bg-background", className)}
    >
      {navbar ?? <Navbar />}

      <div
        data-slot="page-shell"
        className={cn("flex min-h-0 flex-1", contentClassName)}
      >
        {showSidebar ? (
          <Sidebar label={sidebarLabel}>{sidebar}</Sidebar>
        ) : null}

        <main
          id="main-content"
          className={cn(
            "animate-enter flex min-w-0 flex-1 flex-col focus:outline-none",
            mainClassName,
          )}
          tabIndex={-1}
        >
          {children}
        </main>
      </div>

      {footer ?? <Footer />}
    </div>
  );
}

export { PageWrapper };
