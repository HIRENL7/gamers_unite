"use client";

import { Mail } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { AuthField } from "@/features/auth/components/auth-field";
import { zodResolver } from "@/features/auth/components/zod-resolver";
import { forgotPasswordSchema } from "@/features/auth/schemas/auth.schema";
import type { ForgotPasswordFormValues } from "@/features/auth/types/auth";

function ForgotPasswordForm() {
  const [status, setStatus] = React.useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ForgotPasswordFormValues) {
    setStatus(`Mock reset link prepared for ${values.email}.`);
  }

  return (
    <form className="grid gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <AuthField
        id="forgot-email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email}
        registration={register("email")}
      />

      <p
        className="text-sm text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        {status ?? "Enter your email to stage a reset link."}
      </p>

      <Button type="submit" disabled={isSubmitting}>
        <Mail aria-hidden="true" />
        Send reset link
      </Button>
    </form>
  );
}

export { ForgotPasswordForm };
