import * as React from "react";

import { cn } from "@/lib/utils";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

const containerSizes: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[88rem]",
  full: "max-w-none",
};

type ContainerProps = React.ComponentProps<"div"> & {
  size?: ContainerSize;
};

function Container({ className, size = "lg", ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(
        "mx-auto w-full px-(--spacing-page)",
        containerSizes[size],
        className,
      )}
      {...props}
    />
  );
}

export { Container };
