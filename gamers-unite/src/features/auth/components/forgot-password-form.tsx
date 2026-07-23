"use client";

import { Mail } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { AuthField } from "@/features/auth/components/auth-field";
import { zodResolver } from "@/features/auth/components/zod-resolver";
import { requestPasswordReset } from "@/features/auth/services/auth-service";
import { forgotPasswordSchema } from "@/features/auth/schemas/auth.schema";
import type { ForgotPasswordFormValues } from "@/features/auth/types/auth";
import { ApiError } from "@/services/axios/error";

function ForgotPasswordForm() {
  const [status, setStatus] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
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

  async function onSubmit(values: ForgotPasswordFormValues) {
    setErrorMessage(null);

    try {
      const response = await requestPasswordReset(values);
      setStatus(response.message);
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Unable to request a password reset right now.";
      setErrorMessage(message);
    }
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

      {errorMessage ? (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <p
        className="text-sm text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        {status ?? "Enter your email to receive reset instructions."}
      </p>

      <Button type="submit" disabled={isSubmitting}>
        <Mail aria-hidden="true" />
        Send reset link
      </Button>
    </form>
  );
}

export { ForgotPasswordForm };
