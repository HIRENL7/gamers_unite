import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { ResetPasswordForm } from "@/lib/lazy/feature-views";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your GameSunite account password.",
};

export default function ResetPasswordPage() {
  return (
    <AuthShell
      title="Reset password"
      description="Set a new password with validation for length, uppercase letters, and numbers."
      footer={
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Return to login
        </Link>
      }
    >
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading form...</p>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
