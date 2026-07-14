"use client";

import { ShieldCheck } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { AuthField } from "@/features/auth/components/auth-field";
import { zodResolver } from "@/features/auth/components/zod-resolver";
import { otpSchema } from "@/features/auth/schemas/auth.schema";
import type { OtpFormValues } from "@/features/auth/types/auth";

function OtpVerificationForm() {
  const [status, setStatus] = React.useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(values: OtpFormValues) {
    setStatus(`Mock code ${values.code} verified.`);
  }

  return (
    <form className="grid gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <AuthField
        id="otp-code"
        label="Verification code"
        type="text"
        placeholder="123456"
        helpText="Enter the 6 digit code from your authenticator or email."
        error={errors.code}
        registration={register("code")}
      />

      <p
        className="text-sm text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        {status ?? "Verification is local only for now."}
      </p>

      <Button type="submit" disabled={isSubmitting}>
        <ShieldCheck aria-hidden="true" />
        Verify code
      </Button>
    </form>
  );
}

export { OtpVerificationForm };
