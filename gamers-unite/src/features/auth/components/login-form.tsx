"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { AuthField } from "@/features/auth/components/auth-field";
import { zodResolver } from "@/features/auth/components/zod-resolver";
import { loginSchema } from "@/features/auth/schemas/auth.schema";
import type { LoginFormValues } from "@/features/auth/types/auth";

function LoginForm() {
  const [status, setStatus] = React.useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  function onSubmit(values: LoginFormValues) {
    setStatus(`Mock login ready for ${values.email}.`);
  }

  return (
    <form className="grid gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <AuthField
        id="login-email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email}
        registration={register("email")}
      />
      <AuthField
        id="login-password"
        label="Password"
        type="password"
        error={errors.password}
        registration={register("password")}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="size-4 rounded border"
            {...register("remember")}
          />
          Remember me
        </label>
        <Link
          href="/forgot-password"
          className="rounded-sm text-sm font-medium text-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          Forgot password?
        </Link>
      </div>

      <p
        className="text-sm text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        {status ?? "No backend call will be made."}
      </p>

      <Button type="submit" disabled={isSubmitting}>
        <LogIn aria-hidden="true" />
        Log in
      </Button>
    </form>
  );
}

export { LoginForm };
