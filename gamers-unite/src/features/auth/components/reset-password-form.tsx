"use client";

import { KeyRound } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { AuthField } from "@/features/auth/components/auth-field";
import { zodResolver } from "@/features/auth/components/zod-resolver";
import { resetPasswordSchema } from "@/features/auth/schemas/auth.schema";
import type { ResetPasswordFormValues } from "@/features/auth/types/auth";

function ResetPasswordForm() {
  const [status, setStatus] = React.useState<string | null>(null);
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

  function onSubmit() {
    setStatus("Mock password reset completed.");
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

      <p
        className="text-sm text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        {status ?? "Password changes are mocked in this phase."}
      </p>

      <Button type="submit" disabled={isSubmitting}>
        <KeyRound aria-hidden="true" />
        Reset password
      </Button>
    </form>
  );
}

export { ResetPasswordForm };
