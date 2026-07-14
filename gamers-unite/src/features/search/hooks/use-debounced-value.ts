"use client";

import * as React from "react";

export function useDebouncedValue<TValue>(value: TValue, delayMs = 300) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timeoutId = globalThis.setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, [delayMs, value]);

  return debouncedValue;
}
