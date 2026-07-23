"use client";

import { KeyRound } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { AuthField } from "@/features/auth/components/auth-field";
import { zodResolver } from "@/features/auth/components/zod-resolver";
import { resetPassword } from "@/features/auth/services/auth-service";
import { resetPasswordSchema } from "@/features/auth/schemas/auth.schema";
import type { ResetPasswordFormValues } from "@/features/auth/types/auth";
import { ApiError } from "@/services/axios/error";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [status, setStatus] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    setErrorMessage(null);

    if (!token) {
      setErrorMessage("Reset token is missing. Use the link from your email.");
      return;
    }

    try {
      const response = await resetPassword(values, token);
      setStatus(response.message);
      router.push("/login");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Unable to reset your password right now.";
      setErrorMessage(message);
    }
  }

  return (
    <form className="grid gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <AuthField
        id="reset-password"
        label="New password"
        type="password"
        helpText="Use 8+ characters with one uppercase letter and one number."
        error={errors.password}
        registration={register("password")}
      />
      <AuthField
        id="reset-confirm-password"
        label="Confirm new password"
        type="password"
        error={errors.confirmPassword}
        registration={register("confirmPassword")}
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
        {status ?? "Choose a new password for your account."}
      </p>

      <Button type="submit" disabled={isSubmitting || !token}>
        <KeyRound aria-hidden="true" />
        Reset password
      </Button>
    </form>
  );
}

export { ResetPasswordForm };
