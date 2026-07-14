"use client";

import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

type AuthFieldProps = {
  error?: FieldError;
  helpText?: string;
  id: string;
  label: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  type?: "email" | "password" | "text";
};

function AuthField({
  error,
  helpText,
  id,
  label,
  placeholder,
  registration,
  type = "text",
}: AuthFieldProps) {
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const describedBy = [
    helpText ? helpId : null,
    error ? errorId : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="text-sm font-medium">{label}</span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
        className={cn(
          "h-10 rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20"
        )}
        {...registration}
      />
      {helpText ? (
        <span id={helpId} className="text-xs text-muted-foreground">
          {helpText}
        </span>
      ) : null}
      {error ? (
        <span id={errorId} className="text-sm text-destructive" role="alert">
          {error.message}
        </span>
      ) : null}
    </label>
  );
}

export { AuthField };
