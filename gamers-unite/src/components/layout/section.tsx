import * as React from "react";

import { cn } from "@/lib/utils";

type SectionSpacing = "sm" | "md" | "lg" | "none";

const sectionSpacing: Record<SectionSpacing, string> = {
  none: "py-0",
  sm: "py-(--spacing-section-sm)",
  md: "py-(--spacing-section)",
  lg: "py-[calc(var(--spacing-section)*1.25)]",
};

type SectionProps = React.ComponentProps<"section"> & {
  spacing?: SectionSpacing;
};

function Section({ className, spacing = "md", ...props }: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn("w-full", sectionSpacing[spacing], className)}
      {...props}
    />
  );
}

export { Section };
