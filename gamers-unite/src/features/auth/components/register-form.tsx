"use client";

import { UserPlus } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { AuthField } from "@/features/auth/components/auth-field";
import { zodResolver } from "@/features/auth/components/zod-resolver";
import { registerSchema } from "@/features/auth/schemas/auth.schema";
import type { RegisterFormValues } from "@/features/auth/types/auth";
import { ApiError } from "@/services/axios/error";
import { useAuthStore } from "@/store/auth-store";

function RegisterForm() {
  const router = useRouter();
  const registerAccount = useAuthStore((state) => state.register);
  const [status, setStatus] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setErrorMessage(null);
    setStatus(null);

    try {
      await registerAccount(values);
      setStatus(`Account created for ${values.name}.`);
      router.push("/");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Unable to create your account right now.";
      setErrorMessage(message);
    }
  }

  return (
    <form className="grid gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <AuthField
        id="register-name"
        label="Name"
        placeholder="Player name"
        error={errors.name}
        registration={register("name")}
      />
      <AuthField
        id="register-email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email}
        registration={register("email")}
      />
      <AuthField
        id="register-password"
        label="Password"
        type="password"
        helpText="Use 8+ characters with one uppercase letter and one number."
        error={errors.password}
        registration={register("password")}
      />
      <AuthField
        id="register-confirm-password"
        label="Confirm password"
        type="password"
        error={errors.confirmPassword}
        registration={register("confirmPassword")}
      />

      <label className="grid gap-2 text-sm" htmlFor="register-terms">
        <span className="inline-flex items-start gap-2">
          <input
            id="register-terms"
            type="checkbox"
            aria-invalid={Boolean(errors.acceptTerms)}
            aria-describedby={
              errors.acceptTerms ? "register-terms-error" : undefined
            }
            className="mt-0.5 size-4 rounded border"
            {...register("acceptTerms")}
          />
          <span>I agree to the community terms.</span>
        </span>
        {errors.acceptTerms ? (
          <span
            id="register-terms-error"
            className="text-sm text-destructive"
            role="alert"
          >
            {errors.acceptTerms.message}
          </span>
        ) : null}
      </label>

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
        {status ?? "Create your GameSunite account."}
      </p>

      <Button type="submit" disabled={isSubmitting}>
        <UserPlus aria-hidden="true" />
        Create account
      </Button>
    </form>
  );
}

export { RegisterForm };
