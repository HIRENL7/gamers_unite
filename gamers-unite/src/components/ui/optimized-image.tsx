import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

type OptimizedImageProps = Omit<ImageProps, "alt" | "src"> & {
  alt: string;
  fallbackClassName?: string;
  showFallback?: boolean;
  src?: ImageProps["src"];
};

function OptimizedImage({
  alt,
  className,
  fallbackClassName,
  priority,
  showFallback = false,
  src,
  ...props
}: OptimizedImageProps) {
  if (showFallback || !src) {
    return (
      <div
        className={cn(
          props.fill && "absolute inset-0",
          "bg-gradient-to-br from-muted to-muted/60",
          fallbackClassName,
          className
        )}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      loading={priority ? undefined : "lazy"}
      priority={priority}
      src={src}
      {...props}
    />
  );
}

export { OptimizedImage };
